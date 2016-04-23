var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
    posted:[{
        post: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        title: String,
        date: Date,
        likes: Number,
    }],
    comments: [{
        comment: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        text: String,
        postedBy: {
            date: Date,
            likes: Number
        }
    }]
});


module.exports = mongoose.model('Comment', CommentSchema);