app.factory('auth', ['$http', '$window', function($http, $window){
    var auth = {};
   
    auth.saveToken = function(token){
        $window.localStorage['Kyle-Mean-App'] = token;
    };
   
    auth.getToken = function(){
        return $window.localStorage['Kyle-Mean-App'];
    };
   
    auth.isLoggedIn = function(){
        var token = auth.getToken();
        if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            
            return payload.exp > Date.now() / 1000;
        }
        return false;
   };
   
    auth.currentUser = function(){
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            
            return payload.username;
        }
    };
    
    auth.register = function(user){
        return $http.post('/user/register', user).success(function(data){
            auth.saveToken(data.token);
        });
    };
    
    auth.login = function(user){
        return $http.post('/user/login', user).success(function(data){
            auth.saveToken(data.token);
        });
    };
    
    auth.logout = function(){
        $window.localStorage.removeItem('Kyle-Mean-App');
    };
    
   return auth;
}]);

app.controller('authController',['$scope', '$state', 'auth', 
function($scope, $state, auth){
    $scope.userRegister = {};
    $scope.userLogin = {};

    $scope.register = function(){
        auth.register($scope.userRegister).error(function(error){
            $scope.error = error;
        }).then(function(){
            $state.go('user_account.overview');
        });
    };

    $scope.login = function(){
        auth.login($scope.userLogin).error(function(error){
            $scope.error = error;
        }).then(function(){
            $state.go('user_account.overview');
        });
    };
}]);
