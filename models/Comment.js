var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
    text: String,
    date: Date,
    upvotes: {type: Number, default: 0},
    comment: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Comment', CommentSchema);