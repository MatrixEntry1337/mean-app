app.factory('overview', ['$http', 'auth', function($http, auth){
    
    var overview = {};
    overview.user = {};
    
    overview.getUserInfo = function(){
        $http.get('/retrieve/user/populate', {
            headers: { Authorization: 'Bearer '+auth.getToken() }
            }).success(function(data){
            angular.copy(data, overview.user);
        });
    };
    
    overview.getDiscussions = function(){
      return this.user.discussions;  
    };
    
    overview.getProjects = function(){
        return this.projects;
    };
    
    overview.getEvents = function(){
        return this.user.events;
    };
    
    overview.getEventDate = function(){
        var dateInfo = [], temp; 
        for(var i = 0; i < this.user.events.length; i++){
            temp = new Date(this.user.events[i].date);
            dateInfo.push({day: temp.getDay(), month: temp.getMonth(), year: temp.getFullYear()}); 
        }
        return dateInfo;
    };
    
    overview.getNotifications = function(){
      return this.user.notifications;  
    };
    
    overview.getNotificationDate = function(){
        var dateInfo = [], temp;
        for(var i = 0; i < this.user.notifications.length; i++){
            temp = new Date(this.user.notifications[i].date);
            dateInfo.push({minutes: temp.getMinutes(), hours: temp.getHours(), day: temp.getDay(), month: temp.getMonth(), year: temp.getFullYear()}); 
        }
        return dateInfo;
    };
    
    overview.getNotes = function(){
        return this.user.notes;
    };
    
    overview.getFriends = function(){
        return this.user.friends;
    };
    
    overview.getDiscussions = function(){
        return this.user.discussions;
    };
    
    return overview;
}]);

app.controller('homeController', ['$scope', 'overview', function($scope, overview){
    
    $scope.notes = overview.getNotes();
    $scope.events = overview.getEvents();
    $scope.eventDate = overview.getEventDate();
    $scope.friends = overview.getFriends();
    $scope.discussions = overview.getDiscussions();
    $scope.notifications = overview.getNotifications();
    $scope.notificationDate = overview.getNotificationDate();
   
}]);