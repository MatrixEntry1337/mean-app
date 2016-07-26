chatModule.controller('chatCtrl', 
['$scope','chatFtry', function($scope, chatFtry){
	$scope.hello = chatFtry.message();
}]);