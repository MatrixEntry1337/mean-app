var mongoose = require("mongoose");

var SkillSchema = new mongoose.Schema({
    skillName: { type: String, required: true },
    skillLevel: { type: Number, required: true }
});

mongoose.model('Skill', SkillSchema);