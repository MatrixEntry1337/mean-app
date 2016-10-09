var socketio = require('socket.io');
var mongoose = require('mongoose');

//DBs
// var User = mongoose.model('User');
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
    	
    	//New chat messages
    	socket.on('newMessage', function(message, user, index){
    	    
            console.log("User " + user + " is logged in");
            
            //Query database to add messages to friend dbs
            var query = Friend.findOne({ user: handshakeData._query._id, friend: user });
            var query2 = Friend.findOne({ user: user, friend: handshakeData._query._id });
            
            //Send chat message to self
            query.exec(function(err, friendData){
                if(err) console.log("An error has occured.");
                if(!friendData) console.log("Could not find frined data");
                else{
                    friendData.chat.push({ isFriend: false, message: message });
                    friendData.save(function(err, messages){
                        if(err) console.log("An error has occured.");
                        console.log("Message was posted on sender's database: " + message);
                        clients[users[handshakeData._query._id]].emit('newMessage', 
                        { messageData:{isFriend: false, message: message, date: Date.now(), opened: false}, index: index });
                    });
                }
            });
            
            //Send chat message to friend
            query2.exec(function(err, friendData){
               if(err) console.log("An error has occured.");
               if(!friendData) console.log("Could not find friend data");
               else{
                 friendData.chat.push({ isFriend: true, message: message, opened: false });
                 friendData.save(function(err, friendData){
                    if(err) console.log("An error has occured.");
                    else{
                        console.log("Message was posted on friend's database: " + message);
                        //Send to user if connected
                        if(users[user]){
                            clients[users[user]].emit('newMessage', 
                            { messageData:{isFriend: true, message: message, opened: false, date: Date.now()}, index: index });
                        }
                    }
                 });
               }
            });
    	});
    	
    	//Read Messages
    	socket.on('readMessages', function(user, index){
    	    var query = Friend.findOne({ user: handshakeData._query._id, friend: user });
    	    
    	    query.exec(function(err, friendData){
    	        if(err) console.log("An error has occured.");
                if(!friendData) console.log("Could not find friend data"); 
    	        for(var i = 0; i < friendData.chat.length; i++){
    	            if(!friendData.chat[i].opened) friendData.chat[i].opened = true;
    	        }
    	        friendData.save(function(err){
    	           if(err) console.log("An error has occured.");
    	           console.log("Chat array was saved.");
    	        });
    	        console.log("Read messages");
    	    });
    	});
    	
    	
    // 	//Join chat room - add functionality later
    //     socket.on('joinRoom', function(message, roomName){
    //       socket.join(roomName);
    //     });
    
	});
	

    return io;
};