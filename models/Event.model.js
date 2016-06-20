var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    createdBy: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    invites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        content: { type: String }, 
        date: { type: Date, default: Date.now },
        upvotes: { type: Number, default: 0 },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }]
});

module.exports = mongoose.model('Event', EventSchema);