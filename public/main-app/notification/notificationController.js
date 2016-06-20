notificationModule.controller('notificationController', 
['$scope', 'notificationFactory', function($scope, notificationFactory){
	 //Notifications
    $scope.notifications = notificationFactory.getNotifications();
    
    $scope.notificationElapsedTime = function(index){
    	return notificationFactory.notificationElapsedTime(index);	
    };
}]);