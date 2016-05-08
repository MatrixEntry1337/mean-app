var mongoose = require('mongoose');

var SocialContactSchema = new mongoose.Schema({
    socialSite: { type: String, required: true },
    socialName: { type: String, required: true },
    notes: { type: String }
});

mongoose.model('SocialContact', SocialContactSchema);