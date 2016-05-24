var mongoose = require('mongoose');

var FriendSchema = new mongoose.Schema({
    num: { type: Number, default: 0 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

FriendSchema.methods.addUSer = function(cb) {
  this.num += 1;
  this.save(cb);
};

module.exports = mongoose.model('Friend', FriendSchema);