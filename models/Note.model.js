var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
   title: { type: String, required: true },
   summary: { type: String, default: 'No summary provided.'},
   date: { type: String, default: Date.now },
   content: { type: String, required: true },
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model( 'Note', NoteSchema );