var mongoose = require('mongoose');

var FriendSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true },
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
	}],
	chat:[{ 
		friend: { type: Boolean },
	    message: { type: String }, 
	    date: { type: Date, default: Date.now }
	}],
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Friend', FriendSchema);