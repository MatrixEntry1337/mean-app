notificationModule.controller('notificationCtrl', 
['$scope', '$uibModal', 'notificationFtry', 'friendFtry', '$log', 
function($scope, $uibModal, notificationFtry, friendFtry, $log){
	
    $scope.notifications = notificationFtry.getNotifications();
    
    $scope.notificationElapsedTime = function(index){
    	return notificationFtry.notificationElapsedTime($scope.notifications.length - index - 1);	
    };
    
    $scope.remove = function(notification){
    	notificationFtry.removeNotification(notification);	
    };
    
    //Modal
	$scope.animationsEnabled = true;
	
	$scope.open = function (notification) {
		$log.log("Notification status: " + notification.status);
		//Friend Request
		if(notification.type == 1 && notification.status != "Accepted"){
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
    				friendFtry.acceptFriendRequest(notification).error(function(error){
            			$scope.error = error;
    				}).success(function(){
    					notification.status = "Accepted";
    				});
    			}
			});
		}

	};
}]);