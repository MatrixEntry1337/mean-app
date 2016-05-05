app.factory('contactFactory', [function(){
    var contactObject = {};
    var contacts = [
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
    
    contactObject.getContacts = function(){
        return contacts;
    };
    
    return contactObject;
}]);

app.controller('contactController',['$scope', 'contactFactory', 
function($scope, contactFactory){
    $scope.contacts = contactFactory.getContacts();
}]);