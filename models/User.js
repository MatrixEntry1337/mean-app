var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true},
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateJoined: Date
});

module.exports = mongoose.model('User', UserSchema);