var app = angular.module("km-app", ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
   $urlRouterProvider.otherwise('/overview');
    
    $stateProvider
        .state('overview',{
            url: '/overview',
            templateUrl: 'assets/partials/partial-overview.html'
        })
        
        .state('profile',{
            url:'/profile',
            templateUrl: 'assets/partials/partial-profile.html'
        })
        
        .state('users', {
            url:'/users',
            templateUrl: 'assets/partials/partial-users.html'
        })
        
        .state('projects', {
            url:'/projects',
            templateUrl: 'assets/partials/partial-projects.html'
        })
        
        .state('comments', {
            url:'/comments',
            templateUrl: 'assets/partials/partial-comments.html'
        })
        
        .state('history', {
            url:'/history',
            templateUrl: 'assets/partials/partial-history.html'
        })
        
        .state('settings', {
            url:'/settings',
            templateUrl: 'assets/partials/partial-settings.html'
        });
}]);