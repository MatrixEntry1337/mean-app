authModule.factory('authFtry', 
['$http', '$window', '$log', function($http, $window, $log){
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
        console.log("Logging out!");
        $window.localStorage.removeItem('Kyle-Mean-App');
    };
    
   return auth;
}]);