import express from 'express'
import extend from 'lodash/extend'
import Media from '../models/media.model'
import formidable from 'formidable'
import fs from 'fs'

//media streaming
import mongoose from 'mongoose'
import dbErrorhandler from '../helpers/dbErrorhandler'

let gridfs = null
mongoose.connection.on('connected', () => {
    gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db)
})

const create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "File could not be uploaded"
            })
        }
        let media = new Media(fields)
        media.postedBy = req.profile
        if (files.audio) {
            let writeStream = gridfs.openUploadStream(media._id, {
                contentType: files.audio.type || 'binary/octet-stream'
            })
            fs.createReadStream(files.audio.path).pipe(writeStream)
        }
        try {
            let result = await media.save()
            res.status(200).json(result)
        } catch (err) {
            return res.status(400).json({
                error: dbErrorhandler.getErrorMessage(err)
            })
        }
    })
}

const mediaByID = async (req, res, next, id) => {
    try {
        let media = await Media.findById(id).populate('postedBy', '_id name').exec()
        if (!media)
            return res.status('400').json({
                error: "Media not found"
            })
        req.media = media
        let files = await gridfs.find({ filename: media._id }).toArray()
        if (!files[0]) {
            return res.status(404).send({
                error: 'No media found'
            })
        }
        req.file = files[0]
        console.log('controller')
        console.log(req.file)
        next()
    } catch (err) {
        return res.status(404).send({
            error: 'Could not retrieve media file'
        })
    }
}

const read = (req, res) => {
    console.log(req.media)
    return res.json(req.media)
}

const music = (req, res) => {
    const range = req.headers["range"]
    if (range && typeof range === "string") {
        const parts = range.replace(/bytes=/, "").split("-")
        const partialstart = parts[0]
        const partialend = parts[1]

        const start = parseInt(partialstart, 10)
        const end = partialend ? parseInt(partialend, 10) : req.file.length - 1
        const chunksize = (end - start) + 1

        res.writeHead(206, {
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Range': 'bytes ' + start + '-' + end + '/' + req.file.length,
            'Content-Type': req.file.contentType
        })

        let downloadStream = gridfs.openDownloadStream(req.file._id, { start, end: end + 1 })
        downloadStream.pipe(res)
        downloadStream.on('error', () => {
            res.sendStatus(404)
        })
        downloadStream.on('end', () => {
            res.end()
        })
    } else {
        res.header('Content-Length', req.file.length)
        res.header('Content-Type', req.file.contentType)

        let downloadStream = gridfs.openDownloadStream(req.file._id)
        downloadStream.pipe(res)
        downloadStream.on('error', () => {
            res.sendStatus(404)
        })
        downloadStream.on('end', () => {
            res.end()
        })
    }
}

const listPopular = async (req, res) => {
    try {
        let media = await Media.find({}).limit(9)
            .populate('postedBy', '_id name')
            .sort('-views')
            .exec()
        res.json(media)
    } catch (error) {
        return res.status(400).json({
            error: dbErrorhandler.getErrorMessage(error)
        })
    }
}

const listRelated = async (req, res) => {
    try {
        let media = await Media.find({ "_id": { "$ne": req.media }, "genre": req.media.genre})
            .limit(4)
            .sort('-views')
            .populate('postedBy', '_id name')
            .exec()
        res.json(media)
    } catch (error) {
        return res.status(400).json({
            error: dbErrorhandler.getErrorMessage(error)
        })
    }
}

const listByUser = async (req, res) => {
    try {
        let media = await Media.find({postedBy: req.profile._id})
            .populate('postedBy', '_id name')
            .sort('-created')
            .exec()
        res.json(media)
    } catch (err) {
        return res.status(400).json({
            error: dbErrorhandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let media = req.media
        let deleteMedia = await media.remove()
        gridfs.delete(req.file._id)
        res.json(deleteMedia)
    } catch (err) {
        return res.status(400).json({
            error: dbErrorhandler.getErrorMessage(err)
        })
    }
}

const update = async (req, res) => {
    try {
        let media = req.media
        media.extend(media, req.body)
        media.updated = Date.now()
        await media.save()
        res.json(media)
    } catch (error) {
        return res.status(400).json({
            error: dbErrorhandler.getErrorMessage(error)
        })
    }
}


export default {
    create,
    music,
    mediaByID,
    read,
    listPopular,
    listRelated,
    listByUser,
    remove,
    update
}