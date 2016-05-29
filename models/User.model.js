var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, lowercase: true },
    salt: { type:String, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    line1: { type: String },
    line2: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    email: { type: String, required: true },
    cellPhone: { type: String },
    officePhone: { type: String }, 
    companyName: { type: String },
    role: { type: String },
    summary: {type: String},
    dateJoined: { type: Date, default: Date.now },
    notifications: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      notType: { type: Number, required: true}, 
      notSummary: { type: String, required: true},
      status: { type: String, required: true},
      date: { type: Date, default: Date.now }
    }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    recentEvents: [{  
      title: { type: String, required: true },
      date: { type: Date, default: Date.now },
      summary: { type: String, required: true }
    }],
    friends: { type: mongoose.Schema.Types.ObjectId, ref: 'Friend' },
    numFriends: { type: Number, default: 0 },
    experiences: [{
      companyName: { type: String, required: true },
      role: { type: String, rewuired: true },
      start: { type: String, required: true },
      end: { type: String, required: true },
      description: { type: String, required: true }
    }],
    education: [{
      schoolName: { type: String, required: true },
      program: { type: String, required: true },
      start: { type: String, required: true },
      end: { type: String, required: true },
      description: { type: String }
    }],
    projects: [{
      title: { type: String, required: true },
      link: { type: String, required: true },
      date: { type: Date, default: Date.now },
      description: { type: String , required: true},
      content: { type: String, required: true },
      upvotes: { type: Number, default: 0 },
      comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectComment' }]
    }],
    projectComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectComment' }],
    discussions: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
    recentDiscussions: [{
      title: { type: String, required: true },
      date: { type: Date, default: Date.now },
      description: { type: String, required: true },
      content: { type: String, required: true }
    }],
    discussionComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DiscussionComment' }],
    comments: { type: mongoose.Schema.Types.ObjectId, ref: 'UserComment' },
    socialContacts: [{
      socialSite: { type: String, required: true },
      socialName: { type: String, required: true },
      notes: { type: String }
    }],
    skills: [{ 
      skillName: { type: String, required: true },
      skillLevel: { type: Number, required: true },
    }],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});


UserSchema.methods.addUser = function(cb) {
  this.numFriends += 1;
  this.save(cb);
};

UserSchema.methods.removeUser = function(cb) {
  this.numFriends -= 1;
  this.save(cb);
};

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

