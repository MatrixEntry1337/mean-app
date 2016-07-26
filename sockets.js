// sockets.js
var socketio = require('socket.io');

module.exports.listen = function(app){
    console.log('Socket.io working');
    
    var io = socketio.listen(app);
	
	io.on('connection', function(socket){
		console.log('a user connected');
		socket.on('disconnect', function () {
        	console.log('user disconnected');
    	});
	});
	

    return io;
};