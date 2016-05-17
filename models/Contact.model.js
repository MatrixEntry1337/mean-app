var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
    num: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

ContactSchema.methods.addUSer = function(cb) {
  this.num += 1;
  this.save(cb);
};

module.exports = mongoose.model('Contact', ContactSchema);