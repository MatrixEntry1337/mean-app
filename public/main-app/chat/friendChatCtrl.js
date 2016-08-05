chatModule.controller('friendChatCtrl',
['$scope', 'chatFtry', 'friendFtry', 'accountFtry', '$log',
function($scope, chatFtry, friendFtry, accountFtry, $log){
	
	/*Chat*/
    $scope.currentChat = 0;
    
    $scope.friendList = friendFtry.returnFriends();
    
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
        if(this.newMessage)
            chatFtry.sendMessage(this.newMessage, user);
        else $log.log('Enter a message');
    };
    
    $scope.readNewMessage = function(){
        var newMessage = chatFtry.receiveMessage();
        if(newMessage.is){
            this.friendList[this.currentChat].chat.push({ message: newMessage.message, friend: newMessage.friend });
            chatFtry.messageReceived();
        }
    };
    
}]);