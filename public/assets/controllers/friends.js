app.factory('friendFactory', [function(){
    var friendObject = {};
    var friends = [
        {
            name:"Evan Habersham",
            state:"New York",
            country: "US",
            info: "Web Developer at Jetblue",
            notifications: "5",
            followers: "10"
        },
        {
            name: "Akich White",
            state: "New jersey",
            country: 'US',
            info: "Insurance Agent at NY Life",
            notifications: "7",
            followers: "15"
        }
    ];
    
    friendObject.getfriends = function(){
        return friends;
    };
    
    return friendObject;
}]);

app.controller('friendController',['$scope', 'friendFactory', 
function($scope, friendFactory){
    $scope.friends = friendFactory.getfriends();
}]);