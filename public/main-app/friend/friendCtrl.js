friendModule.controller('friendCtrl', 
['$scope', '$uibModal', 'friendFtry', 'notificationFtry', 'accountFtry', '$log', 
function($scope, $uibModal, friendFtry, notificationFtry, accountFtry, $log){
	
	//Friends
    $scope.requestUser = {};
    $scope.searchEntry = {};
    $scope.justSent = {};
    $scope.friendList = friendFtry.returnFriends();
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
    
    /*Chat*/
    $scope.currentChat;
    
    //changes the current chat
    $scope.showChat = function(index){
        $log.log("The current chat: " + index);
        $scope.currentChat = index;
    };
    
    //returns the current chat
    $scope.chatActive = function(index){
        if(this.currentChat == index){
            $log.log("Current active chat index: " + index);
            return true;
        }
        $log.log("This chat is not active: " + index);
        $log.log("Current active chat index: " + this.currentChat);
        return false;
    };
    
    $scope.chatPosition = function(friend){
        if(friend) return "left";
        else return "right";
    };
    
    $scope.messageBy = function(friend, index){
        if(friend)
            return this.friendList[index].friend.firstName 
            + " " + this.friendList[index].friend.lastName;
        else
            return accountFtry.user.firstName
            + " " + accountFtry.user.lastName;
    };
    
    $scope.sendMessage = function(user){
        $log.log("Sending message to" + user);
        if(this.newMessage)
            friendFtry.sendMessage(this.newMessage, user);
        else $log.log('Enter a message');
    };
    
}]);