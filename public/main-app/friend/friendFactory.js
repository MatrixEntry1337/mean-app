friendModule.factory('friendFactory', 
['$http', 'authFactory', 'accountFactory', 'notificationFactory', 
function($http, authFactory, accountFactory, notificationFactory){
	var friends = {};
	friends.searchResult = [];
	friends.requestMessage;
	friends.data = accountFactory.user.friends;
	
	//Friends!!!
    friends.getFriends = function(){
        return friends.data;
    };
    
    friends.friendSearch = function(searchParams){
        return $http.post('/find/friend', searchParams, {
            headers: { Authorization: 'Bearer '+authFactory.getToken() }
        }).success(function(data){
            angular.copy(data, friends.searchResult); 
        });
    };
    
    friends.friendRequest = function(user){
        return $http.post('/send/friend/request', user, {
            headers: { Authorization: 'Bearer '+authFactory.getToken() }
        }).success(function(data){
            notificationFactory.data.push(data);
        });
    };
    
    friends.checkUser = function(username){
      for(var i = 0; i < notificationFactory.data.length; i++){
          if(notificationFactory.data[i].user == username && notificationFactory.data[i].type == 0)
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