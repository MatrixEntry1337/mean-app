eventModule.controller('eventController', ['$scope', 'eventFactory', function($scope, eventFactory){

	$scope.newEvent = {};
    $scope.events = eventFactory.getEvents();
    $scope.eventDate = function(index){
    	eventFactory.getEventDate(index);
	};
	
	$scope.createEvent = function(){
        eventFactory.newEvent($scope.newEvent).error(function(error){
            $scope.error = error;
        });
    };
	
}]);

