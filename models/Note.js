var mongoose = require('mongoose');

var NoteSchema = new mongoose.schema({
   title: { type: String, required: true },
   date: { type: String, default: Date.now },
   content: { type: String, required: true }
});

mongoose.model( 'Note', NoteSchema );