var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date },
    description: { type: String }
});

mongoose.model('Event', EventSchema);