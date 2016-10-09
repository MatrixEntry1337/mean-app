authModule.controller('authCtrl', 
['$scope', '$state', 'authFtry', 'accountFtry', function($scope, $state, authFtry, accountFtry){
	$scope.isLoggedIn = authFtry.isLoggedIn;
    $scope.currentUser = authFtry.currentUser;
    
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
    
    $scope.logout = function(){
        //Clear Data
        accountFtry.clearData();
        //Clear token from local storage
        authFtry.logout();
    };
}]);

