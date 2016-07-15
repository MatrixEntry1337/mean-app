friendModule.factory('friendFactory', 
['$http', 'authFactory', 'accountFactory', 'notificationFactory', '$log',  
function($http, authFactory, accountFactory, notificationFactory, $log){
	var friends = {};
	friends.searchResult = [];
	friends.data = [];
	friends.requestMessage;
	
	//Get friends from database
	friends.findFriends = function(){
	    return $http.get('/get/friends', {
            headers: { Authorization: 'Bearer '+ authFactory.getToken() }
        }).success(function(data){
            angular.copy(data, friends.data);
        });
	}();
	
	//Return list of friends!
    friends.getFriends = function(){
        var returnFriends = [];
        for(var i = 0; i < this.data.length; i ++){
            if(this.data[i].accepted == false)
                returnFriends.push(this.data[i]);
        }
        $log.log(returnFriends);
        return returnFriends;
    };
    
    friends.friendSearch = function(searchParams){
        return $http.post('/find/friend', searchParams, {
            headers: { Authorization: 'Bearer '+ authFactory.getToken() }
        }).success(function(data){
            angular.copy(data, friends.searchResult); 
        });
    };
    
    friends.friendRequest = function(user){
        $log.log('test');
        return $http.post('/send/friend/request', user, {
            headers: { Authorization: 'Bearer '+ authFactory.getToken() }
        }).success(function(data){
            $log.log(data);
            // notificationFactory.data.push(data.notification);
            // friends.data.push(data.friend);
        });
    };
    
    friends.acceptFriendRequest = function(user){
        return $http.post('/accept/friend/request', user, {
            headers: { Authorization: 'Bearer '+ authFactory.getToken() }
        }).success(function(data){
           friends.acceptMessage = data;
           $log.log(data);
        });
    };
    
    friends.checkFR = function(username){
        var check = notificationFactory.getNotifications();
        $log.log(username);
      for(var i = 0; i < check.length; i++){
          $log.log(check[i].username);
          if(check[i].username == username)
            return true;
      }  
      return false;
    };
    
    friends.getSearchResult = function(){
        return this.searchResult;
    };
    
    friends.getRequestMessage = function(){
        return this.requestMessage;
    };
    
    return friends;
    
}]);