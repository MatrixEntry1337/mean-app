chatModule.factory('chatFtry', 
['$http', 'authFtry', 'accountFtry', 'friendFtry', '$log', 
function($http, authFtry, accountFtry, friendFtry, $log){
	
	var chat = {};
	chat.newMessage;
	
	//connect socket
	var socket = io.connect({ query: "_id=" + accountFtry.user._id });
	
	//send chat 
    chat.sendMessage = function(newMessage, user){
        socket.emit('newMessage', newMessage, user);
    };
    
    //receive chat
    socket.on('newMessage', function(newMessage){
        $log.log(newMessage);
        chat.newMessage = { is: true, message: newMessage.message, friend: newMessage.friend };
    });
    
    //retrieve new message
    chat.receiveMessage = function(){
    	return chat.newMessage;
    };
    
    chat.messageReceived = function(){
        this.newMessage.is = false;
    };
    
	return chat;
}]);