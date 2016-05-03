var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
    test:{type: mongoose.Schema.Types.ObjectId, required: true},
    testName: String,
    testNotes: String,
});

mongoose.model('Test', testSchema);