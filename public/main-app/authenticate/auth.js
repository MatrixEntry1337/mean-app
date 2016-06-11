var authModule = angular.module('auth', ['ui.router']);

authModule.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
   $urlRouterProvider.otherwise('login_or_register');
    
    $stateProvider
        .state('login_or_register', {
            url: '/login_or_register',
            templateUrl: 'assets/partials/login-or-register.html',
            controller: 'loginController',
            onEnter: ['$state', 'auth', function($state, auth){
                if(auth.isLoggedIn()){
                    $state.go('user_account.home');
                }
            }]
        });
}]);