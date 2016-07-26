var mainModule = angular.module("main", 
['ui.router', 'ui.bootstrap', 'kmaModule', 'auth', 'account', 
'discussion', 'event', 'friend', 'note', 'notification', 'profile', 'education', 
'experience', 'skill', 'socialContact', 'chat']);

mainModule.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
   $urlRouterProvider.otherwise('login_or_register');
    
    //states 
    $stateProvider
        .state('login_or_register', {
            url: '/login_or_register',
            templateUrl: 'main-app/sections/login-or-register.html',
            controller: 'authCtrl',
            onEnter: ['$state', 'authFtry', function($state, authFtry){
                if(authFtry.isLoggedIn()){
                    $state.go('user_account.home');
                }
            }]
        })
        //abstract parent 
        .state('user_account', {
            abstract: true,
            url: '/user_account',
            templateUrl: 'main-app/sections/abstract-user-account.html',
            onEnter: ['$state', 'authFtry', function($state, authFtry){
                if(!authFtry.isLoggedIn()){
                    $state.go('login_or_register');
                }
            }],
            resolve: {
                userInfo: ['accountFtry', function(accountFtry){
                    return accountFtry.getUserInfo();
                }],
            }
        })
        
        //child 
            .state('user_account.home',{
                url: '/home',
                views: {
                    '':{
                        templateUrl: 'main-app/sections/section-home.html',
                    },
                    'notes@user_account.home': {
                        templateUrl: 'main-app/note/partial-notes.html',
                        controller: 'noteCtrl'
                    },
                    'events@user_account.home': {
                        templateUrl: 'main-app/event/partial-events.html',
                        controller: 'eventCtrl'
                    },
                    'friends@user_account.home': {
                        templateUrl: 'main-app/friend/partial-friends.html',
                        controller: 'friendCtrl',
                        resolve: {
                            friends: ['friendFtry', function(friendFtry){
                                    return friendFtry.getFriends();
                            }]
                        }
                    },
                    'notifications@user_account.home': {
                        templateUrl: 'main-app/notification/partial-notifications.html',
                        controller: 'notificationCtrl'
                    },
                    'discussions@user_account.home': {
                        templateUrl: 'main-app/discussion/partial-discussions.html',
                        controller: 'discussionCtrl'
                    }
                },
                onEnter: ['$state', 'authFtry', function($state, authFtry){
                        if(!authFtry.isLoggedIn()){
                            $state.go('login_or_register');
                        }
                    }]
            })
            
        //child
            .state('user_account.profile',{
                url:'/profile',
                views: {
                    '':{
                        templateUrl: 'main-app/sections/section-profile.html',
                        controller: 'profileCtrl'
                    },
                    'socialContacts@user_account.profile': {
                        templateUrl: 'main-app/socialContact/partial-social-contacts.html',
                        controller: 'socialContactCtrl'
                    },
                    'skills@user_account.profile': {
                        templateUrl: 'main-app/skill/partial-skills.html',
                        controller: 'skillCtrl'
                    },
                    'experiences@user_account.profile': {
                        templateUrl: 'main-app/experience/partial-experiences.html',
                        controller: 'experienceCtrl'
                    },
                    'education@user_account.profile': {
                        templateUrl: 'main-app/education/partial-education.html',
                        controller: 'educationCtrl'
                    }
                },
                onEnter: ['$state', 'authFtry', function($state, authFtry){
                    if(!authFtry.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child
            .state('user_account.friends', {
                url:'/friends',
                templateUrl: 'main-app/sections/section-friends.html',
                onEnter: ['$state', 'authFtry', function($state, authFtry){
                    if(!authFtry.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child
            .state('user_account.projects', {
                url:'/projects',
                templateUrl: 'main-app/sections/section-projects.html',
                onEnter: ['$state', 'authFtry', function($state, authFtry){
                    if(!authFtry.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child
            .state('user_account.comments', {
                url:'/comments',
                templateUrl: 'main-app/sections/section-comments.html',
                onEnter: ['$state', 'authFtry', function($state, authFtry){
                    if(!authFtry.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child
            .state('user_account.history', {
                url:'/history',
                templateUrl: 'main-app/sections/section-history.html',
                onEnter: ['$state', 'authFtry', function($state, authFtry){
                    if(!authFtry.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
        //child - abstract
            .state('user_account.settings', {
                abstract: true,
                url:'/settings',
                templateUrl: 'main-app/sections/section-settings.html',
                onEnter: ['$state', 'authFtry', function($state, authFtry){
                    if(!authFtry.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
            //child
            .state('user_account.settings.profile', {
                url:'/profile',
                templateUrl: 'main-app/sections/section-settings-profile.html',
                controller: 'accountCtrl',
                onEnter: ['$state', 'authFtry', function($state, authFtry){
                    if(!authFtry.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
            //child
            .state('user_account.settings.password', {
                url:'/password',
                templateUrl: 'main-app/sections/section-settings-password.html',
                controller: 'passwordCtrl',
                onEnter: ['$state', 'authFtry', function($state, authFtry){
                    if(!authFtry.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            })
            
            //child
            .state('user_account.settings.notification', {
                url:'/notification',
                templateUrl: 'main-app/sections/section-settings-notification.html',
                onEnter: ['$state', 'authFtry', function($state, authFtry){
                    if(!authFtry.isLoggedIn()){
                        $state.go('login_or_register');
                    }
                }]
            });
}]);