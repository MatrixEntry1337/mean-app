discussionModule.controller('discussionCtrl', 
['$scope', '$uibModal', 'discussionFtry', function($scope, $uibModal, discussionFtry){
	$scope.newDiscussion = {};
	$scope.discussions = discussionFtry.getDiscussions();
	
	$scope.createDiscussion = function(){
        discussionFtry.newDiscussion($scope.newDiscussion).error(function(error){
            $scope.error = error;
        });
    };
	
	$scope.getDiscussionElapsedTime = function(index){
		return discussionFtry.getDiscussionElapsedTime(index);
	};
	
	//Modal
	$scope.animationsEnabled = true;
	
	$scope.items = { title: 'Discussion', objects: [{ name:'Title' }, 
		{ name:'Summary' }, { name:'Description' }] };
	
	$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'main-app/modal/modal-template-form-nodate.html',
			controller: 'modalFormCtrl',
			size: size,
			resolve: {
				items: function() {
					return $scope.items;
				}
			}
    	});

    	modalInstance.result.then(function(items) {
    		$scope.newDiscussion.title = items.objects[0].data;
    		$scope.newDiscussion.summary = items.objects[1].data;
    		$scope.newDiscussion.description = items.objects[2].data;
    		$scope.createDiscussion();
    	});
	};
	
}]);