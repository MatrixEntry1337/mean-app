eventModule.controller('eventCtrl', ['$scope', '$uibModal', 'eventFtry', '$log', function($scope, $uibModal, eventFtry, $log){

	$scope.newEvent = {};
    $scope.events = eventFtry.getEvents();
	
	$scope.createEvent = function(){
        eventFtry.newEvent($scope.newEvent).error(function(error){
        	$log.log(error);
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
    		//Debug
    		// $log.log("Data from even modal: ");
    		// $log.log(items.objects[0].data);
    		// $log.log(items.objects[1].data);
    		// $log.log(items.objects[2].data);
    		$scope.newEvent.title = items.objects[0].data;
    		$scope.newEvent.summary = items.objects[1].data;
    		$scope.newEvent.content = items.objects[2].data;
    		$scope.newEvent.date = items.date;
    		$scope.createEvent();
    	});
	};
	
}]);

