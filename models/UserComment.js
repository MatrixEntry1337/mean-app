var mongoose = require("mongoose");

var UserCommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    upvotes: { type: Number, default: 0 }
});

UserCommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('UserComment', UserCommentSchema);