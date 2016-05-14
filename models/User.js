var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true },
    cellPhone: { type: String },
    officePhone: { type: String }, 
    companyName: { type: String },
    role: { type: String },
    overview: {type: String},
    dateJoined: { type: Date, default: Date.now },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
    education: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    projectComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectComment' }],
    discussions: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
    discussionComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DiscussionComment' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserComment' }],
    socialContacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SocialContact'}],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

mongoose.model('User', UserSchema);

