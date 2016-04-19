var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var objectId =  Schema.ObjectId;

var NotificationSchema = new Schema({
    notification: objectId,
    type: String,
    refTo: 'User',
    refBy: 'User'
});

module.exports('Notification', NotificationSchema)