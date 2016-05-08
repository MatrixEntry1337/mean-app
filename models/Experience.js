var mongoose = require('mongoose');

var ExperienceSchema = new mongoose.schema({
    companyName: { type: String, required: true },
    role: { type: String, rewuired: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    description: { type: String, required: true }
});

mongoose.model( 'Experience', ExperienceSchema );