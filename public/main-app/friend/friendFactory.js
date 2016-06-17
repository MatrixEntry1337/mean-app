friendModule.factory('friendFactory', 
['$http', 'authFactory', 'accountFactory', function($http, authFactory, accountFactory){
	var friends = {};
	friends.searchResult;
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
            headers: { Authorization: 'Bearer '+auth.getToken() }
        }).success(function(data){
            angular.copy(data, friends.requestMessage);    
        });
    };
    
    friends.getSearchResult = function(){
       
        return this.searchResult;
    };
    
    friends.getRequestMessage = function(){
        return this.requestMessage;
    };
    
    return friends;
    
}]);