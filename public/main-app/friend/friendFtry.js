friendModule.factory('friendFtry', 
['$http', 'authFtry', 'accountFtry', '$log',  
function($http, authFtry, accountFtry, $log){
	
	//Friends
	var friends = {};
	friends.searchResult = [];
	friends.data = [];
	
	//Get friends from database
	friends.getFriends = function(){
	    return $http.get('/get/friends', {
            headers: { Authorization: 'Bearer '+ authFtry.getToken() }
        }).success(function(data){
            angular.copy(data, friends.data);
        });
	};
	
	//Return list of friends!
    friends.returnFriends = function(){
        return this.data;
    };
    
    //Search for a friend by username
    friends.friendSearch = function(searchParams){
        return $http.post('/find/friend', searchParams, {
            headers: { Authorization: 'Bearer '+ authFtry.getToken() }
        }).success(function(data){
            angular.copy(data, friends.searchResult); 
        });
    };
    
    //Request a user to be a friend
    friends.friendRequest = function(user){
        return $http.post('/send/friend/request', user, {
            headers: { Authorization: 'Bearer '+ authFtry.getToken() }
        }).success(function(data){
            friends.notification = data.notification;
            friends.data.push(data.friend);
        });
    };
    
    //Accept outstanding friend requests
    friends.acceptFriendRequest = function(user){
        return $http.post('/accept/friend/request', user, {
            headers: { Authorization: 'Bearer '+ authFtry.getToken() }
        }).success(function(data){
            $log.log(data);
           friends.acceptMessage = data;
           friends.data[data.friend].accepted = true;
        });
    };
    
    //Check to see if a friend has already been requested
    friends.checkFR = function(user){
        if(this.data.length > 0){
            var found = this.data.find(function(element){
               return element.friend._id == user; 
            });
        
            if(found) return true;
            else return false;  
            
        }
        return false;
        
        // for(var i = 0; i < this.data.length; i++){
        //   if(this.data[i].friend.username == username)
        //     return true;
        // }  
        // return false;
    };
    
    friends.checkFriend = function(user){
        if(this.data.length > 0){
            var found = this.data.find(function(element){
                if(element.friend._id == user){
                    return element.accepted == true;   
                }
            });
            if(found) return true;
            else return false;
        }
        return false;
        // for(var i = 0; i < this.data.length; i++){
        //     if(this.data[i].friend.username == username)
        //         if(this.data[i].accepted == true)
        //             return true;
        // return false;
        // }  
    };
    
    friends.getSearchResult = function(){
        return this.searchResult;
    };
    
    //Returns the number of friends
    friends.numOfFriends = function(){
        return friends.data.length;
    };
    
    /****************** Chat **********************/
    
    //Read Messages
    friends.readMessages = function(index){
        for(var i = 0; i < friends.data[index].chat.length; i++){
            if(!friends.data[index].chat[i].opened) friends.data[index].chat[i].opened = true;
        }
        $log.log("Messages Opened.");
        return;
    };
    
    //Returns missed messages
    friends.getMissedMessages = function(index){
        var messages = 0;
        if(friends.data[index].chat.length == 0){
            $log.log("No missed messages");
            return null;
        }
	    for(var i = 0; i < friends.data[index].chat.length; i++){
            if(!friends.data[index].chat[i].opened && friends.data[index].chat[i].isFriend) 
                messages++;
        }
        $log.log("Missed messages: " + messages);
        return messages;
	};
	
	//Returns the latest message from friend
	friends.getLatestFriendMessage = function(index){
		var latestMessage = null;
    	for(var i = 0; i < friends.data[index].chat.length; i++){
            if(friends.data[index].chat[i].isFriend) latestMessage = friends.data[index].chat[i].message;
        }
        return latestMessage;	
	};
	
	//Returns the message date 
	friends.getMessageDate = function(messageDate){
		var timeElapsed = this.getElapsedTime(messageDate); 
		if (timeElapsed.seconds < 60) return "Just Now";
    	else if(timeElapsed.minutes < 60) return timeElapsed.minutes + "m";
    	else if(timeElapsed.hours < 24) return timeElapsed.hours + "h " + (timeElapsed.minutes % 60) + "m";
    	else if(timeElapsed.days < 31) return timeElapsed.days + "d";
    	else if(timeElapsed.months < 21) return timeElapsed.months + "mon";
    	else return timeElapsed.years + "years";
	};
	
	//Returns the date for the latest message 
	friends.getLatestFriendMessageDate = function(index){
		var messageDate = null;
        // for(var i = 0; i < chatArray.length; i++){
        //     if(chatArray[i].isFriend) latestDate = chatArray[i].date;
        // }
        for(var i = 0; i < friends.data[index].chat.length; i++){
            if(friends.data[index].chat[i].isFriend) messageDate = friends.data[index].chat[i].date;
        }
        
        if(messageDate){
        	var timeElapsed = this.getElapsedTime(messageDate);
        	if (timeElapsed.seconds < 60) return "Just Now";
        	else if(timeElapsed.minutes < 60) return timeElapsed.minutes + "m ago";
        	else if(timeElapsed.hours < 24) return timeElapsed.hours + "h " + (timeElapsed.minutes % 60) + "m ago";
        	else if(timeElapsed.days < 31) return timeElapsed.days + "d ago";
        	else if(timeElapsed.months < 21) return timeElapsed.months + "mon ago";
        	else return timeElapsed.years + "years";
        }
        return null;	
	};
    
    //Returns the computed elapsed time between now and passed parameter
	friends.getElapsedTime = function(messageDate){
    	var time, temp, elapsed;
        var date = new Date();
        temp = new Date(messageDate);
        elapsed =  date.getTime() - temp.getTime();
        time = {seconds: Math.floor(elapsed / 1000), 
            minutes: Math.floor(elapsed / (1000 * 60)), hours: Math.floor(elapsed / (1000*60*60)), 
            day: Math.floor(elapsed / (1000*60*60*24)), month: Math.floor(elapsed / (1000*60*60*24*30)), 
            years: Math.floor(elapsed / (1000*60*60*24*30*12))}; 
        return time;
	};
    
    // friends.getLatestFriendMessageElapsedTime = function(latestDate){
    // 	var time, temp, elapsed;
    //     var date = new Date();
    //     temp = new Date(latestDate);
    //     elapsed =  date.getTime() - temp.getTime();
    //     time = {seconds: Math.floor(elapsed / 1000), 
    //         minutes: Math.floor(elapsed / (1000 * 60)), hours: Math.floor(elapsed / (1000*60*60)), 
    //         day: Math.floor(elapsed / (1000*60*60*24)), month: Math.floor(elapsed / (1000*60*60*24*30)), 
    //         years: Math.floor(elapsed / (1000*60*60*24*30*12))}; 
    //     return time;
    // };
    
    return friends;
}]);