var mongoose = require('mongoose');

var DiscussionSchema = new mongoose.Schema({
   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   title: { type: String, required: true },
   date: { type: Date, default: Date.now },
   description: { type: String, required: true },
   content: { type: String, required: true },
   upvote: { type: Number, default: 0 },
   comments: [{ 
      content: { type: String, required: true },
      date: { type: Date, default: Date.now },
      upvotes: { type: Number, default: 0 },
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
   }],
});

module.exports = mongoose.model( 'Discussion', DiscussionSchema );