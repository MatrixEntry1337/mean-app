eventModule.factory('eventFactory', 
['$http', '$log', 'authFactory', 'accountFactory', function($http, $log, authFactory, accountFactory){
	var events = {};
	events.data = accountFactory.user.events;
	
	//Events
    events.getEvents = function(){
        return this.data;
    };
    
    events.newEvent = function(event){
        return $http.post('/create/new/event', event, {
            headers: { Authorization: 'Bearer '+authFactory.getToken() }
            }).success(function(data){
                events.data.push(data);
            });
    };
    
    events.deleteEvent = function(eventInfo){
      return $http.post('/delete/event', eventInfo, {
          headers: { Authorization: 'Bearer '+authFactory.getToken() }
            }).success(function(data){
                events.deleteMessage = data.message;
            });  
    };
    
    return events;
}]);