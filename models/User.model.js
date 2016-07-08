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
    job: { type: String },
    position: { type: String },
    summary: {type: String},
    socialContacts: [{
      socialSite: { type: String},
      socialName: { type: String},
      socialWebsite: { type: String}
    }],
    skills: [{ 
      skillName: { type: String},
      skillLevel: { type: String},
    }],
    education: [{
      schoolName: { type: String},
      program: { type: String},
      start: { type: Date },
      end: { type: Date },
      description: { type: String }
    }],
    experiences: [{
      companyName: { type: String },
      role: { type: String},
      start: { type: Date },
      end: { type: Date },
      description: { type: String }
    }],
    dateJoined: { type: Date, default: Date.now },
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    eventInvites: [{
	    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	    eventRef: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
	    acceptDeny: {type: Boolean},
    }],
    notes: [{ 
      title: { type: String},
      summary: { type: String},
      date: { type: Date, default: Date.now },
      content: { type: String }
    }],
    notifications: [{
      user: { type: String },
      type: { type: Number }, 
      summary: { type: String},
      status: { type: String},
      date: { type: Date, default: Date.now }
    }],
    friends: [{ 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        accepted: { type: Boolean },  
        blocked: { type: Boolean }
    }],
    comments: [{ 
      text:{ type: String}, 
      date: { type: Date, default: Date.now },
      upvotes: { type: Number, default: 0 },
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
    }],
    latestFriendComments: [{
	    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	    sentTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	    message: { type: String },
	    date: { type: Date }
    }],
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
    exp: parseInt(exp.getTime() / 1000)
  }, 'SECRET');
};

module.exports = mongoose.model('User', UserSchema);

