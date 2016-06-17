eventModule.factory('eventFactory', 
['$http', 'authFactory', 'accountFactory', function($http, authFactory, accountFactory){
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
    
    events.getEventDate = function(index){
        var dateInfo = {};
        var temp = new Date(events.data[index].date);
        dateInfo.day = temp.getDay();
        dateInfo.month = temp.getMonth(); 
        dateInfo.year = temp.getFullYear(); 
        return dateInfo;
    };
    
    return events;
}]);