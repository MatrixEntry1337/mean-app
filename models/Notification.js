var mongoose = require("mongoose");


var NotificationSchema = new mongoose.Schema({
    notification: { type: mongoose.Schema.Types.ObjectId, refTo: 'User', refBy: 'User', required: true},
    notice: String,
    time: Date,
});

mongoose.model('Notification', NotificationSchema)