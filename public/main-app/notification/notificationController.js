notificationModule.controller('notificationController', 
['$scope', '$uibModal', 'notificationFactory', 'friendFactory', '$log', 
function($scope, $uibModal, notificationFactory, friendFactory, $log){
	
	//Notifications
	
    $scope.notifications = notificationFactory.getNotifications();
    
    $scope.notificationElapsedTime = function(index){
    	return notificationFactory.notificationElapsedTime($scope.notifications.length - index - 1);	
    };
    
    //Modal
	$scope.animationsEnabled = true;
	
	$scope.open = function (notification) {
		
		//Friend Request
		if(notification.type == 1){
    		var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'main-app/modal/modal-template-confirm.html',
				controller: 'modalConfirmCtrl',
				resolve: {
					items: function() {
						return {title: 'Confirm Friend Request', notification };
					}
				}
	    	});
	    	
	    	modalInstance.result.then(function(confirm) {
    			if(confirm){
    				friendFactory.acceptFriendRequest(notification).error(function(error){
            			$scope.error = error;
    				});
    			}
			});
		}

	};
}]);