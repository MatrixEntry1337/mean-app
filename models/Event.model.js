var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Event', EventSchema);