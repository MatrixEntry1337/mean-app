var mongoose = require('mongoose');

var DiscussionCommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    upvotes: { type: Number, default: 0 },
    discussion: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model( 'DiscussionComment', DiscussionCommentSchema );