var mongoose = require('mongoose');

var DiscussionSchema = new mongoose.Schema({
   title: { type: String, required: true },
   date: { type: Date, default: Date.now },
   description: { type: String, required: true },
   content: { type: String, required: true },
   upvote: { type: Number, default: 0 },
   comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DiscussionComments' }],
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model( 'Discussion', DiscussionSchema );