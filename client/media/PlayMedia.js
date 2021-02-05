import { FormControlLabel, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router'
import { listRelated, read } from './api-media.js'
import Media from './Media'
import RelatedMedia from './RelatedMedia.js'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 30,
    },
    toggle: {
        float: 'right',
        marginRight: '30px',
        marginLeft: '10px'
    }
}))

export default function PlayMedia(props) {
    const classes = useStyles()
    let [media, setMedia] = useState({ postedBy: {} })
    let [relatedMedia, setRelatedMedia] = useState([])
    const [autoplay, setAutoplay] = useState(false)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({ mediaId: props.match.params.mediaId }, signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setMedia(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [props.match.params.mediaId])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listRelated({
            mediaId: props.match.params.mediaId
        }, signal).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setRelatedMedia(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [props.match.params.mediaId])

    const handleChange = (event) => {
        setAutoplay(event.target.checked)
    }

    const handleAutoplay = (updateMediaControls) => {
        let playlist = relatedMedia
        let playMedia = playlist[0]
        if (!autoplay || playlist.length == 0)
            return updateMediaControls()
        if (playlist.length > 1) {
            playlist.shift()
            setMedia(playMedia)
            setRelatedMedia(playlist)
        } else {
            listRelated({
                mediaId: playMedia._id
            }).then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setMedia(playMedia)
                    setRelatedMedia(data)
                }
            })
        }
    }

    if (props.data && props.data[0] != null) {
        media = props.data[0]
        relatedMedia = []
    }

    const nextUrl = relatedMedia.length > 0 ? `/media/${relatedMedia[0]._id}` : ''

    return (
        <div className={classes.root}>
            <Grid container spacing={8}>
                <Grid item xs={8} sm={8}>
                    <Media
                        media={media}
                        nextUrl={nextUrl}
                        handleAutoplay={handleAutoplay}
                    />
                </Grid>
                {
                    relatedMedia.length > 0 &&
                    (
                        <Grid item xs={4} sm={4}>
                            <FormControlLabel
                                className={classes.toggle}
                                control={
                                    <Switch
                                        checked={autoplay}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label={autoplay ? 'Autoplay ON' : 'Autoplay OFF'}
                            />
                            <RelatedMedia media={relatedMedia} />
                        </Grid>
                    )
                }
            </Grid>
        </div>
    )
}
