var mongoose = require('mongoose');

var DiscussionCommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    upvotes: { type: Number, default: 0 }
});

mongoose.model( 'DiscussionComment', DiscussionCommentSchema );