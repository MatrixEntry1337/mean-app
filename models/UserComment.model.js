var mongoose = require("mongoose");

var UserCommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{
      text:{ type: String, required: true }, 
      date: { type: Date, default: Date.now },
      upvotes: { type: Number, default: 0 },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]
});

module.exports = mongoose.model('UserComment', UserCommentSchema);