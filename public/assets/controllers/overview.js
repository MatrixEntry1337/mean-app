app.factory('overview', ['$http', 'auth', function($http, auth){
    
    var overview = {};
    overview.ned = [];
    overview.friends = [];
    
    overview.getUserInfo = function(){
        $http.get('/retrieve/user/notes-events-discussions', {
            headers: {Authorization: 'Bearer '+auth.getToken()}
            }).success(function(data){
            angular.copy(data, overview.ned);
        });
        
        $http.get('/retrieve/user/friends', {
            headers: {Authorization: 'Bearer '+auth.getToken()}
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
    
    overview.getFriends = function(){
        return this.friends.friends;
    };
    
    overview.getDiscussions = function(){
        return this.ned.discussions;
    };
    
    return overview;
}]);

app.controller('overviewController', ['$scope', 'overview', function($scope, overview){

    $scope.notes = overview.getNotes();
    $scope.events = overview.getEvents();
    $scope.friends = overview.getFriends();
    $scope.discussions = overview.getDiscussions();

}]);