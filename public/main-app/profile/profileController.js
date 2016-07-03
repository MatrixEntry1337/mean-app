profileModule.controller('profileController', 
['$scope', 'profileFactory', function($scope, profileFactory){
    
    $scope.user = profileFactory.getProfileInfo();
    
    
}]);