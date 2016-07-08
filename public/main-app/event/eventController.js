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
	
	$scope.items = { title: 'Events', objects: [{ name:'Title' }, 
		{ name:'Summary' }, { name:'Event Content' }], singleDate: true};
	
	$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'main-app/modal/modal-template-form.html',
			controller: 'modalFormCtrl',
			size: size,
			resolve: {
				items: function() {
					return $scope.items;
				}
			}
    	});

    	modalInstance.result.then(function(items) {
    		$scope.newEvent.title = items.objects[0].data;
    		$scope.newEvent.summary = items.objects[1].data;
    		$scope.newEvent.content = items.objects[2].data;
    		$scope.newEvent.date = items.date;
    		$scope.createEvent();
    	});
	};
	
}]);

