app.factory('NotService', [function(){
    var notObject = {
        notifications:[]
    };
    
    return notObject;
}]);

app.controller('NotController', ['$scope', 'NotService',
function($scope, NotService){
    $scope.notifications=NotService.notifications;
}]);