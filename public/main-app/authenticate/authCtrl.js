authModule.controller('authCtrl', 
['$scope', '$state', 'authFtry', function($scope, $state, authFtry){
	$scope.isLoggedIn = authFtry.isLoggedIn;
    $scope.currentUser = authFtry.currentUser;
    $scope.logout = authFtry.logout;
    
    $scope.userRegister = {};
    $scope.userLogin = {};

    $scope.register = function(){
        authFtry.register($scope.userRegister).error(function(error){
            $scope.regError = error;
        }).then(function(){
            $state.go('user_account.home');
        });
    };

    $scope.login = function(){
        authFtry.login($scope.userLogin).error(function(error){
            $scope.logError = error;
        }).then(function(){
            $state.go('user_account.home');
        });
    };
}]);

