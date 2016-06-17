authModule.controller('authController', 
['$scope', '$state', 'authFactory', function($scope, $state, authFactory){
	$scope.isLoggedIn = authFactory.isLoggedIn;
    $scope.currentUser = authFactory.currentUser;
    $scope.logout = authFactory.logout;
    
    $scope.userRegister = {};
    $scope.userLogin = {};

    $scope.register = function(){
        authFactory.register($scope.userRegister).error(function(error){
            $scope.error = error;
        }).then(function(){
            $state.go('user_account.home');
        });
    };

    $scope.login = function(){
        authFactory.login($scope.userLogin).error(function(error){
            $scope.error = error;
        }).then(function(){
            $state.go('user_account.home');
        });
    };
}]);

