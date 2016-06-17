accountModule.controller('accountController', ['$scope', 'accountFactory', function($scope, accountFactory){
	$scope.user = accountFactory.getSettingsInfo();
}]);