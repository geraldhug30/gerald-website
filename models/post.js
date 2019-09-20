const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    nameFrom : {
        type: String
    },
    title : {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

exports.Post = mongoose.model('post', postSchema);