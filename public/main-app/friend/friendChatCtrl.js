chatModule.controller('friendChatCtrl',
['$scope', 'chatSocketFtry', 'friendFtry', 'accountFtry', '$log',
function($scope, chatSocketFtry, friendFtry, accountFtry, $log){
	
	/////////////////////////////*Chat*////////////////////////
    $scope.currentChat = 0;
    
    $scope.newMessage = "";
    
    $scope.friendList = friendFtry.returnFriends();
    
    var socket = chatSocketFtry.giveMeSocket();
    
    //send a new message 
    $scope.sendMessage = function(user, index){
        var copyMessage = angular.copy(this.newMessage);
        this.newMessage = "";
        socket.emit('newMessage', copyMessage, user, index);
    };
    
    //receive message from server side socket
    socket.on('newMessage', function(newMessage){
        $scope.receiveMessage(newMessage);
    });
    
    //process new message 
    $scope.receiveMessage = function(newMessage){
        $scope.$apply(function() {
            $scope.friendList[newMessage.index].chat.push(newMessage.messageData);
            $log.log("Message is now: " + newMessage.messageData.message);
        });
    };
    
    //Clear messages marked unopened
    $scope.readMessages = function(user, index){
        friendFtry.readMessages(index);
        socket.emit('readMessages', user, index);
    };
    
    //Find out who the message belongs to
    $scope.messageBy = function(isFriend, index){
        if(isFriend)
            return this.friendList[index].friend.firstName 
            + " " + this.friendList[index].friend.lastName;
        else
            return accountFtry.user.firstName
            + " " + accountFtry.user.lastName;
    };
    
    //changes the current chat
    $scope.showChat = function(index){
        
        $log.log("The current chat: " + index);
        $scope.currentChat = index;
    };
    
    //returns the current chat
    $scope.chatActive = function(index){
        
        if(this.currentChat == index){
            return true;
        }
        return false;
    };
    
    //Chat position - you vs friend
    $scope.chatPosition = function(friend){
        if(friend) return "left";
        else return "right";
    };
    
    //Get count of missed messages
    $scope.missedMessages = function(index){
      return friendFtry.getMissedMessages(index);  
    };
    
    //Get the latest message
    $scope.latestFriendMessage = function(index){
        return friendFtry.getLatestFriendMessage(index);
    };
    
    //Get the elapsed time of the latest message
    $scope.latestFriendMessageDate = function(index){
        return friendFtry.getLatestFriendMessageDate(index);
    };
    
    //Get the elapsed time for a message
    $scope.messageDate = function(messageDate){
        return friendFtry.getMessageDate(messageDate);
    };
    
}]);