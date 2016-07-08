friendModule.controller('friendController', ['$scope', 'friendFactory', function($scope, friendFactory){
	
	//Friends
    $scope.requestUser = {};
    $scope.searchEntry = {};
    $scope.friends = friendFactory.getFriends();
    $scope.searchResults = friendFactory.getSearchResult();
    $scope.requestMessage = friendFactory.getRequestMessage();
    
    $scope.findFriend = function(){
        friendFactory.friendSearch($scope.searchEntry).error(function(error){
            $scope.error = error;
        });
    };
    
    $scope.friendRequest = function(username){
        $scope.requestUser.username = username;
        friendFactory.friendRequest($scope.requestUser).error(function(error){
            $scope.error = error;
        });
    };
    
    $scope.disableInvite = function(username){
        return friendFactory.checkUser(username);
    };
    
}]);