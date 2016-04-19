var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var objectId = Schema.ObjectId;

var UserSchema = new Schema({
    user: objectId,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateJoined: Date
});

module.exports = mongoose.model('User', UserSchema);