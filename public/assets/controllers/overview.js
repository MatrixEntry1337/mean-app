app.factory('overview', ['$http', 'auth', function($http, auth){
    
    var overview = {};
    overview.ned = [];
    overview.contacts = [];
    
    overview.getUserInfo = function(){
        $http.get('/retrieve/user/notes-events-discussions', {
            headers: {Authorization: 'Bearer '+auth.getToken()}
            }).success(function(data){
            angular.copy(data, overview.ned);
        });
        
        $http.get('/retrieve/user/contacts', {
            headers: {Authorization: 'Bearer '+auth.getToken()}
            }).success(function(data){
            angular.copy(data, overview.contacts);
        });
    };
    
    overview.getNotes = function(){
        return this.ned.notes;
    };
    
    overview.getEvents = function(){
        return this.ned.events;
    };
    
    overview.getContacts = function(){
        return this.contacts.contacts;
    };
    
    overview.getDiscussions = function(){
        return this.ned.discussions;
    };
    
    return overview;
}]);

app.controller('overviewController', ['$scope', 'overview', function($scope, overview){

    $scope.notes = overview.getNotes();
    $scope.events = overview.getEvents();
    $scope.contacts = overview.getContacts();
    $scope.discussions = overview.getDiscussions();

}]);