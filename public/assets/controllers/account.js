app.factory('account', ['$http', 'overview', 'auth', function($http, overview, auth){
    var account = {};
    
    account.searchResult = [];
   
    account.newNote = function(note){
        return $http.post('/create/new/note', note, {
            headers: { Authorization: 'Bearer '+auth.getToken() }
        }).success(function(){
            overview.user.notes.push(note);
        });
    };
    
    account.newEvent = function(event){
        return $http.post('/create/new/event', event, {
            headers: { Authorization: 'Bearer '+auth.getToken() }
            }).success(function(data){
                overview.user.events.push(event); 
            });
    };
    
    account.friendSearch = function(searchParams){
        
        return $http.post('/find/friend', searchParams, {
            headers: { Authorization: 'Bearer '+auth.getToken() }
        }).success(function(data){
            angular.copy(data, account.searchResult); 
        });
    };
    
    account.friendRequest = function(user){
        return $http.post('/send/friend/request', user, {
            headers: { Authorization: 'Bearer '+auth.getToken() }
        }).success(function(data){
            angular.copy(data, account.requestMessage);    
        });
    };
    
    account.getSearchResult = function(){
       
        return this.searchResult;
    };
    
    account.getRequestMessage = function(){
        return this.requestMessage;
    };
    
    return account;
}]);

app.controller('accountController', ['$scope', 'account', function($scope, account){
    $scope.requestMessage = account.getRequestMessage();
    $scope.user = {};
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
    
    $scope.friendRequest = function(username){
        $scope.user.username = username;
        account.friendRequest($scope.user).error(function(error){
            $scope.error = error;
        });
    };
    
}]);