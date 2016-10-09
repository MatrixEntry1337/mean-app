discussionModule.factory('discussionFtry', 
['$http', 'accountFtry', 'authFtry', '$log', function($http, accountFtry, authFtry, $log){
	
	var discussions = {};
	discussions.data = {};
	
	//get discussion data
	discussions.getData = function(){
	  $log.log("Grabbing discussion data!");
	  return discussions.data = accountFtry.user.discussions;  
	};
	
	//discussions
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