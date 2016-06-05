app.factory('account', ['$http', 'auth', function($http, auth){
    var account = {};
    account.searchResult = [];
    account.user = {};
   
    //Get user info 
    account.getUserInfo = function(){
        $http.get('/retrieve/user/populate', {
            headers: { Authorization: 'Bearer '+auth.getToken() }
            }).success(function(data){
            angular.copy(data, account.user);
        });
    };
    
    //Notes
    account.getNotes = function(){
        return this.user.notes;
    };
    
    account.newNote = function(note){
        return $http.post('/create/new/note', note, {
            headers: { Authorization: 'Bearer '+auth.getToken() }
        }).success(function(data){
            account.user.notes.push(data);
        });
    };
    
    //Discussions
    account.getDiscussions = function(){
      return this.user.discussions;  
    };
    
    account.newDiscussion = function(discussion){
        return $http.post('/create/new/discussion', discussion, {
            headers: { Authorization: 'Bearer '+auth.getToken() }
        }).success(function(data){
            account.user.discussions.push(data); 
        });
    };

    account.getDiscussionElapsedTime = function(){
        var time = [], temp, elapsed;
        var date = new Date();
        for(var i = 0; i < this.user.discussions.length; i++){
            temp = new Date(this.user.discussions[i].date);
            elapsed =  date.getTime() - temp.getTime();
            time.push({seconds: Math.floor(elapsed / 1000), 
            minutes: Math.floor(elapsed / (1000 * 60)), hours: Math.floor(elapsed / (1000*60*60)), 
            day: Math.floor(elapsed / (1000*60*60*24)), month: Math.floor(elapsed / (1000*60*60*24*30)), 
            year: Math.floor(elapsed / (1000*60*60*24*30*12))}); 
        }
        return time;
    };
    
    //Projects
    account.getProjects = function(){
        return this.projects;
    };
    
    
    //Events
    account.getEvents = function(){
        return this.user.events;
    };
    
    account.newEvent = function(event){
        return $http.post('/create/new/event', event, {
            headers: { Authorization: 'Bearer '+auth.getToken() }
            }).success(function(data){
                account.user.events.push(data); 
            });
    };
    
    account.getEventDate = function(){
        var dateInfo = [], temp; 
        for(var i = 0; i < this.user.events.length; i++){
            temp = new Date(this.ned.events[i].date);
            dateInfo.push({day: temp.getDay(), month: temp.getMonth(), year: temp.getFullYear()}); 
        }
        return dateInfo;
    };
    
    //Notifications
    account.getNotifications = function(){
      return this.user.notifications;  
    };
    
    account.getNotificationElapsedTime = function(){
        var time = [], temp, elapsed;
        var date = new Date();
        for(var i = 0; i < this.user.notifications.length; i++){
            temp = new Date(this.user.notifications[i].date);
            elapsed =  date.getTime() - temp.getTime();
            time.push({seconds: Math.floor(elapsed / 1000), 
            minutes: Math.floor(elapsed / (1000 * 60)), hours: Math.floor(elapsed / (1000*60*60)), 
            day: Math.floor(elapsed / (1000*60*60*24)), month: Math.floor(elapsed / (1000*60*60*24*30)), 
            year: Math.floor(elapsed / (1000*60*60*24*30*12))}); 
        }
        return time;
    };
    
    //Friends!!!
     account.getFriends = function(){
        return this.user.friends;
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
    
    //Notes
    $scope.newNote = {};
    $scope.notes = account.getNotes();
    
    //Events
    $scope.newEvent = {};
    $scope.events = account.getEvents();
    $scope.eventDate = account.getEventDate();
    
    //Friends
    $scope.user = {};
    $scope.searchEntry = {};
    $scope.friends = account.getFriends();
    $scope.searchResults = account.getSearchResult();
    $scope.requestMessage = account.getRequestMessage();
    
    //Discussions
    $scope.newDiscussion = {};
    $scope.discussions = account.getDiscussions();
    $scope.discussionElapsedTime = function(index){
        var time = account.getDiscussionElapsedTime();
        if (time[index].seconds < 60) return time[index].seconds + "s";
        else if(time[index].minutes < 60) return time[index].minutes + "m";
        else if(time[index].hours < 24) return time[index].hours + "h " + (time[index].minutes % 60) + "m";
        else if(time[index].days < 31) return time[index].days + "d";
        else if(time[index].months < 21) return time[index].months + "mon";
        else return time[index].years + "years";
    };
    
    //Notifications
    $scope.notifications = account.getNotifications();
    $scope.notificationElapsedTime = function(index){
        var time = account.getNotificationElapsedTime();
        if (time[index].seconds < 60) return time[index].seconds + "s";
        else if(time[index].minutes < 60) return time[index].minutes + "m";
        else if(time[index].hours < 24) return time[index].hours + "h " + (time[index].minutes % 60) + "m";
        else if(time[index].days < 31) return time[index].days + "d";
        else if(time[index].months < 21) return time[index].months + "mon";
        else return time[index].years + "years";
    };
    
    //Create
    $scope.createNote = function(){
        account.newNote($scope.newNote).error(function(error){
            $scope.error = error;
        });
    };
    
    $scope.createEvent = function(){
        account.newEvent($scope.newEvent).error(function(error){
            $scope.error = error;
        });
    };
    
    $scope.createDiscussion = function(){
        account.newDiscussion($scope.newDiscussion).error(function(error){
            $scope.error = error;
        });
    };
    
    //Friends
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