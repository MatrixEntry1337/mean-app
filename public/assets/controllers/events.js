app.factory('eventFactory', [function(){
    var eventObject = {};
    var events = [
        {
            title: "Event #1",
            summary: "This is the event's summary",
            date: new Date('2016', '02', '09')
        },
        {
            title: "Event #3",
            summary: "This is the event's summary",
            date: new Date('2016', '03', '09')
        },
        {
           title: "Event #4",
            summary: "This is the event's summary",
            date: new Date('2016', '05', '03')
        },
        {
            title: "Event #5",
            summary: "This is the event's summary",
            date: new Date('2016', '01', '25')
        },
        {
            title: "Event #6",
            summary: "This is the event's summary",
            date: new Date('2016', '02', '23')
        },
        {
            title: "Event #7",
            summary: "This is the event's summary",
            date: new Date('2016', '02', '01')
        },
        {
            title: "Event #8",
            summary: "This is the event's summary",
            date: new Date('2016', '03', '11')
        }
    ];
    
    eventObject.getEvents = function(){
        return events;
    };
    
    return eventObject;
}]);

app.controller('eventController', ['$scope', 'eventFactory', 
function($scope, eventFactory){
        $scope.events = eventFactory.getEvents();
}]);