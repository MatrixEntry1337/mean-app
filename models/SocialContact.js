var mongoose = require('mongoose');

var SocialContactSchema = new mongoose.Schema({
    socialSite: { type: String, required: true },
    socialName: { type: String, required: true },
    notes: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('SocialContact', SocialContactSchema);