var mongoose = require('mongoose');

var EducationSchema = new mongoose.Schema({
    schoolName: { type: String, required: true },
    program: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model( 'Education', EducationSchema );