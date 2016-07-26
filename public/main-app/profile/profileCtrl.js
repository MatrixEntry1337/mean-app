profileModule.controller('profileCtrl', 
['$scope', 'profileFtry', function($scope, profileFtry){
    
    $scope.user = profileFtry.getProfileInfo();
    
    
}]);