notificationModule.controller('notificationController', 
['$scope', '$uibModal', 'notificationFactory', function($scope, $uibModal, notificationFactory){
	 //Notifications
    $scope.notifications = notificationFactory.getNotifications();
    
    $scope.notificationElapsedTime = function(index){
    	return notificationFactory.notificationElapsedTime($scope.notifications.length - index - 1);	
    };
    
    //Modal
	$scope.animationsEnabled = true;
	
	$scope.items = { title: 'Discussion', objects: [{ name:'Title' }, 
		{ name:'Summary' }, { name:'Description' }] };
	
	$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'main-app/modal/modal-confirm.html',
			controller: 'modalInstanceCtrl',
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