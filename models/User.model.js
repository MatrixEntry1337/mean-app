var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, lowercase: true },
    salt: { type:String, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String },
    email: { type: String, required: true },
    cellPhone: { type: String },
    officePhone: { type: String }, 
    companyName: { type: String },
    role: { type: String },
    overview: {type: String},
    dateJoined: { type: Date, default: Date.now },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    contacts: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
    education: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    projectComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectComment' }],
    discussions: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
    discussionComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DiscussionComment' }],
    comments: { type: mongoose.Schema.Types.ObjectId, ref: 'UserComment' },
    socialContacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SocialContact'}],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 30);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};

module.exports = mongoose.model('User', UserSchema);

