import mongoose from 'mongoose'

const MediaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required"
    },
    description: String,
    genre: String,
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date
    }
})

export default mongoose.model('Media', MediaSchema)