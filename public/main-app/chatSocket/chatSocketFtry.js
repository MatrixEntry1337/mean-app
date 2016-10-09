chatModule.factory('chatSocketFtry', 
['$http', 'accountFtry', '$log', 
function($http, accountFtry , $log){
	
	var chat = {};
	
	//connect socket
	console.log( accountFtry.user._id);
	chat.socket = io.connect({ query: "_id=" + accountFtry.user._id });
	
	//send socket to controller
	chat.giveMeSocket = function(){
	    return chat.socket;
	};
    
	return chat;
}]);