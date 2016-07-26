var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    user: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    invites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        content: { type: String }, 
        date: { type: Date, default: Date.now },
        upvotes: { type: Number, default: 0 },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }]
});

module.exports = mongoose.model('Event', EventSchema);