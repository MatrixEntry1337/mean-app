var mainModule = angular.module("main", ['ui.router', 'account', 'comment', 'discussion', 'event', 'friend', 'note', 'notification', 'project']);

mainModule.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
   $urlRouterProvider.otherwise('login_or_register');
    
    //states 
    $stateProvider
        //abstract parent
        .state('user_account', {
            abstract: true,
            url: '/user_account',
            templateUrl: 'main-app/sections/abstract-user-account.html',
            onEnter: ['$state', 'auth', function($state, auth){
                if(!auth.isLoggedIn()){
                    $state.go('login_or_register');
                }
            }],
            resolve: {
                    postPromise: ['account', function(user){
                        return user.getUserInfo();
                    }]
                }
        })
        
        //child
            .state('user_account.home',{
                views: {
                    'notes': { 
                        url: '/home',
                        templateUrl: 'main-app/data/note/'
                    },
                    'comments': {
                         url: '/home',
                        templateUrl: 'main-app/data/comment/'
                    },
                    'discussions': {
                         url: '/home',
                        templateUrl: 'main-app/data/discussion/'
                    },
                    'events': {
                         url: '/home',
                        templateUrl: 'main-app/data/event/'
                    },
                    'friends': {
                         url: '/home',
                        templateUrl: 'main-app/data/comment/'
                    },
                },
                onEnter: ['$state', 'auth', function($state, auth){
                        if(!auth.isLoggedIn()){
                            $state.go('login_or_register');
                        }
                    }]
            })
            
        //child
            .state('user_account.profile',{
                url:'/profile',
                templateUrl: 'assets/partials/partial-profile.html',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(!auth.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child
            .state('user_account.users', {
                url:'/users',
                templateUrl: 'assets/partials/partial-users.html',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(!auth.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child
            .state('user_account.projects', {
                url:'/projects',
                templateUrl: 'assets/partials/partial-projects.html',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(!auth.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child
            .state('user_account.comments', {
                url:'/comments',
                templateUrl: 'assets/partials/partial-comments.html',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(!auth.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child
            .state('user_account.history', {
                url:'/history',
                templateUrl: 'assets/partials/partial-history.html',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(!auth.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child - abstract
            .state('user_account.settings', {
                abstract: true,
                url:'/settings',
                templateUrl: 'assets/partials/partial-settings.html',
             
                onEnter: ['$state', 'auth', function($state, auth){
                    if(!auth.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
            //child
            .state('user_account.settings.profile', {
                url:'/profile',
                templateUrl: 'assets/partials/partial-settings-profile.html',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(!auth.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
            //child
            .state('user_account.settings.password', {
                url:'/password',
                templateUrl: 'assets/partials/partial-settings-password.html',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(!auth.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
            //child
            .state('user_account.settings.notification', {
                url:'/notification',
                templateUrl: 'assets/partials/partial-settings-notification.html',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(!auth.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        .state('new_note', {
            views: {
                'modal': {
                    url: '/create_note',
                    templateUrl: 'assets/partials/partial-notecreation.html'
                }
            }
        });
}]);