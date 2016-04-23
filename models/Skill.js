var mongoose = require("mongoose");

var SkillSchema = new mongoose.Schema({
    skill: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    skillName: String,
    skillLevel: Number
});

module.exports = mongoose.model('Skill', SkillSchema);