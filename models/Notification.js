var mongoose = require("mongoose");


var NotificationSchema = new mongoose.Schema({
    notification: { type: mongoose.Schema.Types.ObjectId, refTo: 'User', refBy: 'User', required: true},
    message: String,
});

module.exports = mongoose.model('Notification', NotificationSchema)