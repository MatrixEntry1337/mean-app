discussionModule.controller('discussionController', 
['$scope', 'discussionFactory', function($scope, discussionFactory){
	$scope.newDiscussion = {};
	$scope.discussions = discussionFactory.getDiscussions();
	
	$scope.createDiscussion = function(){
        discussionFactory.newDiscussion($scope.newDiscussion).error(function(error){
            $scope.error = error;
        });
    };
	
	$scope.getDiscussionElapsedTime = function(index){
		return discussionFactory.getDiscussionElapsedTime(index);
	};
	
}]);