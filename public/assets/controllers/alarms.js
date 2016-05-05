//Time function needs to be created
//Create color 
app.factory('alarmFactory', [function(){
    var alarmObject = {};
    var alarms = [
        {
            name: "Akich White",
            status: "Pending..",
            color: "color-yellow",
            message: "Your friend request has been sent.",
            time: "Just Now"
        },
        {   
            name: "Evan Habersham",
            status: "Accepted",
            color: "color-green",
            message: "Your friend request has been accepted.",
            time: "Just Now"
        },
        {
            name: "Weon Woo Cho",
            status: "Denied",
            color: "color-red",
            message: "Your friend request has been denied.",
            time: "Just Now"
        },
        {
            name: "Omar Walker",
            status: "Pending..",
            color: "color-yellow",
            message: "Your friend request has been sent.",
            time: "Just Now"
        },
        {
            name: "Felicia Fisher",
            status: "Pending..",
            color: "color-yellow",
            message: "Your friend request has been denied.",
            time: "Just Now"
        },
        {
            name: "Shane Chang Fatt",
            status: "Pending..",
            color: "color-yellow",
            message: "Your friend request has been received.",
            time: "Just Now"
        }
    ];
    
    alarmObject.getAlarms = function(){
        return alarms;  
    };
    
    return alarmObject;
}]);


app.controller('alarmController', ['$scope', 'alarmFactory', function($scope, alarmFactory){
    $scope.alarms = alarmFactory.getAlarms();
}]);