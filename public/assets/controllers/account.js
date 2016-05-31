app.factory('account', ['$http', 'overview', 'auth', function($http, overview, auth){
    var account = {};
    
    account.searchResult = []; 
    
    account.newNote = function(note){
        return $http.post('/create/new/note', note, {
            headers: { Authorization: 'Bearer '+auth.getToken() }
        }).success(function(data){
            overview.ned.notes.push(note);
        });
    };
    
    account.newEvent = function(event){
        return $http.post('/create/new/event', event, {
            headers: { Authorization: 'Bearer '+auth.getToken() }
        }).success(function(data){
           overview.ned.events.push(event); 
        });
    };
    
    account.friendSearch = function(){
        return $http.get('/find/friend', {
            headers: { Authorization: 'Bearer '+auth.getToken() }
        }).success(function(data){
            angular.copy(data, account.searchResult);
        });
    };
    
    account.getSearchResult = function(){
        return this.searchResult;
    };
    
    return account;
}]);

app.controller('accountController', ['$scope', 'account', function($scope, account){
    $scope.newNote = {};
    $scope.searchEntry = {};
    $scope.searchResults = account.getSearchResult();
    
    $scope.createNote = function(){
        account.newNote($scope.newNote).error(function(error){
            $scope.error = error;
        });
    };
    
    $scope.findFriend = function(){
        account.friendSearch($scope.searchEntry).error(function(error){
            $scope.error = error;
        });
    };
    
}]);