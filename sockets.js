var socketio = require('socket.io');
var mongoose = require('mongoose');

//DBs
var User = mongoose.model('User');
var Friend = mongoose.model('Friend');

//User Data
var users = [];
var clients = [];

module.exports.listen = function(app){
    console.log('Socket.io working');
    
    var io = socketio.listen(app);

    io.use(function(socket, next){
        var handshakeData = socket.request;
        console.log("Middleware: " + handshakeData._query._id);
        users[handshakeData._query._id] = socket.id; // connected user with its socket.id
        clients[socket.id] = socket; // add the client data to the hash
        // users.push({username: handshakeData._query.name, socket: socket});
        next();
    });

    // var test = io.of('/testRoom');
    // test.on('connection', function(socket){
    //     console.log('Joined test room');
    // });
	
	
	io.on('connection', function(socket){
		console.log('a user connected');
	    var handshakeData = socket.request;
		
		socket.on('disconnect', function () {
        	console.log('user disconnected');
    	});
    	
    	socket.on('newMessage', function(message, user){
    	    if(users[user]){
    	        console.log("User " + user + " is logged in");
    	        
    	        //queries
    	        var query = User.findById(handshakeData._query._id);
    	        var query2 = Friend.findOne({ user: handshakeData._query._id, friend: user });
    	        var query3 = Friend.findOne({ user: user, friend: handshakeData._query._id });
    	        
    	        query.exec(function(err, user){
    	           if(err) console.log("An error has occured.");
    	           if(!user) console.log('Could not find user. Please ensure user is connected with correct username');
    	           else{
    	               console.log(user);
    	           }
    	        });
    	        
    	        query2.exec(function(err, friendData){
    	            if(err) console.log("An error has occured.");
    	            if(!friendData) console.log("Could not find frined data");
    	            else{
    	                friendData.chat.push({ friend: false, message: message });
    	                friendData.save(function(err, messages){
    	                    if(err) console.log("An error has occured.");
    	                    console.log(messages);
    	                });
    	            }
    	        });
    	        
    	        query3.exec(function(err, friendData){
    	           if(err) console.log("An error has occured.");
    	           if(!friendData) console.log("Could not find friend data");
    	           else{
    	             friendData.chat.push({ friend: true, message: message });
    	             friendData.save(function(err, messages){
    	                if(err) console.log("An error has occured.");
    	                else{
    	                    console.log(messages);
    	                    clients[users[user]].emit('newMessage', message);
    	                }
    	             });
    	           }
    	        });
	        }
    	    else{
    	        console.log("User not found");
    	    }
    	    io.emit('newMessage', { friend: true, message: message });
    	});
    
        socket.on('joinRoom', function(message, roomName){
           socket.join(roomName);
        });
    
	});
	

    return io;
};