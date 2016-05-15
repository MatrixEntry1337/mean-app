var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String , required: true},
  content: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectComment' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

ProjectSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

module.exports = mongoose.model('Project', ProjectSchema);