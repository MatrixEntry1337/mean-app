authModule.controller('loginController', 
['$scope', '$state', 'authFactory', function($state, $scope, authFactory){
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