authModule.controller('authController', 
['$scope', 'authFactory', function($scope, authFactory){
	$scope.isLoggedIn = authFactory.isLoggedIn;
    $scope.currentUser = authFactory.currentUser;
    $scope.logout = authFactory.logout;
}]);

