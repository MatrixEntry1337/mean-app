var mongoose = require('mongoose');

var FriendSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true },
	username: { type: String },
	friend: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	sent: { type: Boolean , required: true},
	sentDate: { type: Date , default:  Date.now },
    accepted: { type: Boolean , default: false },
    favorite: { type: Boolean },
    blocked: { type: Boolean },
    friendComments: [{ 
		text:{ type: String}, 
        date: { type: Date, default: Date.now },
      upvotes: { type: Number, default: 0 }
	}]
});

module.exports = mongoose.model('Friend', FriendSchema);