var mongoose = require('mongoose');

var SocialContactSchema = new mongoose.Schema({
    socialContact: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    socialSite: String,
    socialName: String,
    notes: String
});

mongoose.model('SocialContact', SocialContactSchema);