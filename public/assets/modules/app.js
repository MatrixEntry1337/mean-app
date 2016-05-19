var app = angular.module("km-app", ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
   $urlRouterProvider.otherwise('login_or_register');
    
    $stateProvider
        .state('login_or_register', {
            url: '/login_or_register',
            templateUrl: 'assets/partials/login-or-register.html',
            controller: 'authController',
            onEnter: ['$state', 'auth', function($state, auth){
                if(auth.isLoggedIn()){
                    $state.go('user_account.overview');
                }
            }]
        })
    
        //abstract parent
        .state('user_account', {
            abstract: true,
            url: '/user_account',
            templateUrl: 'assets/partials/abstract-user-account.html'
        })
        
        //child
            .state('user_account.overview',{
                url: '/overview',
                templateUrl: 'assets/partials/partial-overview.html'
            })
            
        //child
            .state('user_account.profile',{
                url:'/profile',
                templateUrl: 'assets/partials/partial-profile.html'
            })
            
        //child
            .state('user_account.users', {
                url:'/users',
                templateUrl: 'assets/partials/partial-users.html'
            })
            
        //child
            .state('user_account.projects', {
                url:'/projects',
                templateUrl: 'assets/partials/partial-projects.html'
            })
            
        //child
            .state('user_account.comments', {
                url:'/comments',
                templateUrl: 'assets/partials/partial-comments.html'
            })
            
        //child
            .state('user_account.history', {
                url:'/history',
                templateUrl: 'assets/partials/partial-history.html'
            })
            
        //child
            .state('user_account.settings', {
                url:'/settings',
                templateUrl: 'assets/partials/partial-settings.html'
            });
}]);