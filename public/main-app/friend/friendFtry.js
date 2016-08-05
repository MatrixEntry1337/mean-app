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
    
    return friends;
}]);