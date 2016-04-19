var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

var CommentSchema = new Schema({
    comment: objectId;
    title: String,
    date: Date,
    likes: Number,
    posted:{
        type: objectId,
        user: 'User',
        date: Date
    }
    comments: [{
        text: String,
        postedBy: {
            type: objectId,
            ref: 'User',
            date: Date,
            likes: Number
        }
    }]
})