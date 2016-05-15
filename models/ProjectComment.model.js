var mongoose = require('mongoose');

var ProjectCommentSchema = mongoose.Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    upvote: { type: Number, default: 0},
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('ProjectComment', ProjectCommentSchema);