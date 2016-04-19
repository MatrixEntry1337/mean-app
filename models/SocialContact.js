var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

var SocialContactSchema = new Schema({
    socialContact: objectId,
    ref: 'User;,
    socialSite: String,
    socialName: String,
    notes: String
});

module.exports = mongoose.model('SocialContact', SocialContactSchema);