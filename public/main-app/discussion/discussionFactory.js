discussion.Module.factory('discussionFactory', 
['$http', 'accountFactory', 'authFactory', function($http, accountFactory, authFactory){
	
	var discussions = {};
	discussions.data = accountFactory.user.discussions;
	
	//Discussions
    discussions.getDiscussions = function(){
      return discussions.data;  
    };
    
    discussions.newDiscussion = function(discussion){
        return $http.post('/create/new/discussion', discussion, {
            headers: { Authorization: 'Bearer '+authFactory.getToken() }
        }).success(function(data){
            discussions.data.push(data); 
        });
    };

    discussions.calcDiscussionElapsedTime = function(){
        var time = [], temp, elapsed;
        var date = new Date();
        for(var i = 0; i < this.data.length; i++){
            temp = new Date(this.data[i].date);
            elapsed =  date.getTime() - temp.getTime();
            time.push({seconds: Math.floor(elapsed / 1000), 
            minutes: Math.floor(elapsed / (1000 * 60)), hours: Math.floor(elapsed / (1000*60*60)), 
            day: Math.floor(elapsed / (1000*60*60*24)), month: Math.floor(elapsed / (1000*60*60*24*30)), 
            year: Math.floor(elapsed / (1000*60*60*24*30*12))}); 
        }
        return time;
    };
    
    discussions.getDiscussionElapsedTime = function(index){
        var time = this.calcDiscussionElapsedTime();
        if (time[index].seconds < 60) return time[index].seconds + "s";
        else if(time[index].minutes < 60) return time[index].minutes + "m";
        else if(time[index].hours < 24) return time[index].hours + "h " + (time[index].minutes % 60) + "m";
        else if(time[index].days < 31) return time[index].days + "d";
        else if(time[index].months < 21) return time[index].months + "mon";
        else return time[index].years + "years";
    };
    
    return discussions;
}]);