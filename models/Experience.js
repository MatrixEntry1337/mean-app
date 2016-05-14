var mongoose = require('mongoose');

var ExperienceSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    role: { type: String, rewuired: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model( 'Experience', ExperienceSchema );