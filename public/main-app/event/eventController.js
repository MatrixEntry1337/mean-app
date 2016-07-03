eventModule.controller('eventController', ['$scope', '$uibModal', 'eventFactory', function($scope, $uibModal, eventFactory){

	$scope.newEvent = {};
    $scope.events = eventFactory.getEvents();
	
	$scope.createEvent = function(){
        eventFactory.newEvent($scope.newEvent).error(function(error){
            $scope.error = error;
        });
    };
    
    //Modal
	$scope.animationsEnabled = true;
	
	$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'main-app/modal/modal-template.html',
			controller: 'modalInstanceCtrl',
			size: size,
			resolve: {
				items: function() {
					return [
						{ name: 'Title' },
						{ name: 'Summary' }, 
						{ name: 'Event Content' },
					];
				},
				singleDate: function(){
					return true;
				}
			}
    	});

    	modalInstance.result.then(function(items) {
    		$scope.newEvent.title = items[0].data;
    		$scope.newEvent.summary = items[1].data;
    		$scope.newEvent.content = items[2].data;
    		$scope.newEvent.date = items.date;
    		$scope.createEvent();
    	});
	};
	
}]);

