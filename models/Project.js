var mongoose = require('mongoose');

var ProjectSchema = mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String , required: true},
    content: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    comments: [{
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
        upvote: { type: Number, default: 0},
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]
});

module.exports = mongoose.model('Project', ProjectSchema);