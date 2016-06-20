accountModule.controller('passwordController',
[ '$scope', '$log', 'accountFactory', function($scope, $log, accountFactory){
	
	$scope.verification = {};
	
	$scope.checkBoxes = { termsAndConditions: false };
    
    $scope.changePassword = function(){
        
        //Check for entry of information here
        if(!$scope.verification.username || 
        !$scope.verification.email ||
        !$scope.verification.originalPassword ||
        !$scope.verification.newPassword ||
        !$scope.verification.confirmPassword){ 
            $scope.fieldAlert = "Please fill out all fields";
        }
        else if($scope.verification.newPassword != $scope.verification.confirmPassword)
            $scope.fieldAlert = "Please verify password.";
        else if($scope.checkBoxes.termsAndConditions){ 
            accountFactory.changePassword($scope.verification);
            setTimeout(function(){
                $scope.$apply(function(){
                     $scope.confirmationAlert = accountFactory.getPasswordAlert();
                });
            }, 1000);
        }
        else{
            $scope.termsAlert = "Please read and confirm Terms and Conditions";
        }
    };
    
}]);