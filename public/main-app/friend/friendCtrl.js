friendModule.controller('friendCtrl', 
['$scope', '$uibModal', 'friendFtry', 'notificationFtry', '$log', 
function($scope, $uibModal, friendFtry, notificationFtry, $log){
	
	//Friends
    $scope.requestUser = {};
    $scope.searchEntry = {};
    $scope.justSent = {};
    $scope.friends = friendFtry.returnFriends();
    $scope.searchResults = friendFtry.getSearchResult();
    
    $scope.findFriend = function(){
        friendFtry.friendSearch($scope.searchEntry).error(function(error){
            $scope.error = error;
        });
    };
    
    $scope.friendRequest = function(user){
        friendFtry.friendRequest(user).error(function(error){
            $scope.error = error;
        }).then(function(){
            notificationFtry.data.push(friendFtry.notification);
        });
    };
    
    $scope.checkFriendRequest = function(user){
      return friendFtry.checkFR(user);
    };
    
    $scope.checkFriend = function(user){
      return friendFtry.checkFriend(user); 
    };
    
}]);