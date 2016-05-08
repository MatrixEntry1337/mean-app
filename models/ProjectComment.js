var mongoose = require('mongoose');

var ProjectCommentSchema = mongoose.Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    upvote: { type: Number, default: 0}
});

mongoose.model('ProjectComment', ProjectCommentSchema);