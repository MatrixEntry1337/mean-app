var mongoose = require("mongoose");

var SkillSchema = new mongoose.Schema({
    skillName: { type: String, required: true },
    skillLevel: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Skill', SkillSchema);