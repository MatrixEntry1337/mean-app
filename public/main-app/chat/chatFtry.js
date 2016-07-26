chatModule.factory('chatFtry', 
['authFtry', 'accountFtry', function(authFtry, accountFtry){
	var chat = {};
	
	 var socket = io();
	
	chat.message = function(){
		socket.emit('message', "Hello World!");	
	};
	
	return chat;
}]);