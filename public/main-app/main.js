var mainModule = angular.module("main", ['ui.router', 'auth', 'account', 'discussion', 'event', 'friend', 'note', 'notification']);

mainModule.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
   $urlRouterProvider.otherwise('login_or_register');
    
    //states 
    $stateProvider
        .state('login_or_register', {
            url: '/login_or_register',
            templateUrl: 'main-app/sections/login-or-register.html',
            controller: 'authController',
            onEnter: ['$state', 'authFactory', function($state, authFactory){
                if(authFactory.isLoggedIn()){
                    $state.go('user_account.home');
                }
            }]
        })
        //abstract parent 
        .state('user_account', {
            abstract: true,
            url: '/user_account',
            templateUrl: 'main-app/sections/abstract-user-account.html',
            onEnter: ['$state', 'authFactory', function($state, authFactory){
                if(!authFactory.isLoggedIn()){
                    $state.go('login_or_register');
                }
            }],
            resolve: {
                    postPromise: ['accountFactory', function(user){
                        return user.getUserInfo();
                    }]
                }
        })
        
        //child 
            .state('user_account.home',{
                views: {
                    '':{
                        templateUrl: 'main-app/sections/section-home.html',
                    },
                    'notes@user_account.home': {
                        templateUrl: 'main-app/note/partial-notes.html',
                        controller: 'noteController'
                    },
                    'events@user_account.home': {
                        templateUrl: 'main-app/event/partial-events.html',
                        controller: 'eventController'
                    },
                    'friends@user_account.home': {
                        templateUrl: 'main-app/friend/partial-friends.html',
                        controller: 'friendController'
                    },
                    'notifications@user_account.home': {
                        templateUrl: 'main-app/notification/partial-notifications.html',
                        controller: 'notificationController'
                    },
                    'discussions@user_account.home': {
                        templateUrl: 'main-app/discussion/partial-discussions.html',
                        controller: 'discussionController'
                    }
                },
                url: '/home',  
                onEnter: ['$state', 'authFactory', function($state, authFactory){
                        if(!authFactory.isLoggedIn()){
                            $state.go('login_or_register');
                        }
                    }]
            })
            
        //child
            .state('user_account.profile',{
                url:'/profile',
                templateUrl: 'main-app/sections/section-profile.html',
                onEnter: ['$state', 'authFactory', function($state, authFactory){
                    if(!authFactory.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child
            .state('user_account.users', {
                url:'/users',
                templateUrl: 'main-app/sections/section-users.html',
                onEnter: ['$state', 'authFactory', function($state, authFactory){
                    if(!authFactory.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child
            .state('user_account.projects', {
                url:'/projects',
                templateUrl: 'main-app/sections/section-projects.html',
                onEnter: ['$state', 'authFactory', function($state, authFactory){
                    if(!authFactory.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child
            .state('user_account.comments', {
                url:'/comments',
                templateUrl: 'main-app/sections/section-comments.html',
                onEnter: ['$state', 'authFactory', function($state, authFactory){
                    if(!authFactory.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child
            .state('user_account.history', {
                url:'/history',
                templateUrl: 'main-app/sections/section-history.html',
                onEnter: ['$state', 'authFactory', function($state, authFactory){
                    if(!authFactory.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child - abstract
            .state('user_account.settings', {
                abstract: true,
                url:'/settings',
                templateUrl: 'main-app/sections/section-settings.html',
                onEnter: ['$state', 'authFactory', function($state, authFactory){
                    if(!authFactory.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
            //child
            .state('user_account.settings.profile', {
                url:'/profile',
                templateUrl: 'main-app/sections/section-settings-profile.html',
                controller: 'accountController',
                onEnter: ['$state', 'authFactory', function($state, authFactory){
                    if(!authFactory.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
            //child
            .state('user_account.settings.password', {
                url:'/password',
                templateUrl: 'main-app/sections/section-settings-password.html',
                controller: 'passwordController',
                onEnter: ['$state', 'authFactory', function($state, authFactory){
                    if(!authFactory.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
            //child
            .state('user_account.settings.notification', {
                url:'/notification',
                templateUrl: 'main-app/sections/section-settings-notification.html',
                onEnter: ['$state', 'authFactory', function($state, authFactory){
                    if(!authFactory.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            });
}]);