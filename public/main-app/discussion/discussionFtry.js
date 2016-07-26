discussionModule.factory('discussionFtry', 
['$http', 'accountFtry', 'authFtry', function($http, accountFtry, authFtry){
	
	var discussions = {};
	discussions.data = accountFtry.user.discussions;
	
	//Discussions
    discussions.getDiscussions = function(){
      return this.data;  
    };
    
    discussions.newDiscussion = function(discussion){
        return $http.post('/create/new/discussion', discussion, {
            headers: { Authorization: 'Bearer '+authFtry.getToken() }
        }).success(function(data){
            discussions.data.push(data); 
        });
    };
    
    return discussions;
}]);