var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

var SkillSchema = new Schema({
    skills: objectId,
    ref: 'User',
    skillName: String,
    skillLevel: Number
});

module.exports('Skills', SkillSchema)