discussionModule.factory('discussionFactory', 
['$http', 'accountFactory', 'authFactory', function($http, accountFactory, authFactory){
	
	var discussions = {};
	discussions.data = accountFactory.user.discussions;
	
	//Discussions
    discussions.getDiscussions = function(){
      return this.data;  
    };
    
    discussions.newDiscussion = function(discussion){
        return $http.post('/create/new/discussion', discussion, {
            headers: { Authorization: 'Bearer '+authFactory.getToken() }
        }).success(function(data){
            discussions.data.push(data); 
        });
    };
    
    return discussions;
}]);