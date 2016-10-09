eventModule.factory('eventFtry', 
['$http', '$log', 'authFtry', 'accountFtry', function($http, $log, authFtry, accountFtry){
	var events = {};
	events.data = {};
	
	//get event data
	events.getData = function(){
	    $log.log("Grabbing event data!");
	    return events.data = accountFtry.user.events;
	};
	
	//Events
    events.getEvents = function(){
        return this.data;
    };
    
    events.newEvent = function(event){
        return $http.post('/create/new/event', event, {
            headers: { Authorization: 'Bearer '+authFtry.getToken() }
            }).success(function(data){
                events.data.push(data);
            });
    };
    
    events.deleteEvent = function(eventInfo){
      return $http.post('/delete/event', eventInfo, {
          headers: { Authorization: 'Bearer '+authFtry.getToken() }
            }).success(function(data){
                events.deleteMessage = data.message;
            });  
    };
    
    return events;
}]);