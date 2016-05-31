app.factory('overview', ['$http', 'auth', function($http, auth){
    
    var overview = {};
    overview.ned = [];
    overview.friends = {};
    
    overview.getUserInfo = function(){
        $http.get('/retrieve/user/notes-events-discussions', {
            headers: { Authorization: 'Bearer '+auth.getToken() }
            }).success(function(data){
            angular.copy(data, overview.ned);
        });
        
        $http.get('/retrieve/user/friends', {
            headers: { Authorization: 'Bearer '+auth.getToken() }
            }).success(function(data){
            angular.copy(data, overview.friends);
        });
    };
    
    overview.getNotes = function(){
        return this.ned.notes;
    };
    
    overview.getEvents = function(){
        return this.ned.events;
    };
    
    overview.getEventDate = function(){
        var dateInfo = {}, temp; 
        dateInfo.day = [], dateInfo.month = [], dateInfo.year = [];
        for(var i = 0; i < this.ned.events.length; i++){
            temp = new Date(this.ned.events[i].date);
            dateInfo.day[i] = temp.getDay();
            dateInfo.month[i] = temp.getMonth() + 1;
            dateInfo.year[i] = temp.getFullYear();
        }
        return dateInfo;
    };
    
    overview.getFriends = function(){
        return this.friends.friends;
    };
    
    overview.getDiscussions = function(){
        return this.ned.discussions;
    };
    
    overview.getDiscussionComments = function(){
        if(!this.ned.discussions.comments)
            return 0;
        return this.ned.discussions.comments.length();
    };
    
    return overview;
}]);

app.controller('overviewController', ['$scope', 'overview', function($scope, overview){
    
    $scope.notes = overview.getNotes();
    $scope.events = overview.getEvents();
    $scope.eventDate = overview.getEventDate();
    $scope.friends = overview.getFriends();
    $scope.discussions = overview.getDiscussions();
    $scope.numComments = overview.getDiscussionComments();
   
}]);