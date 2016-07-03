accountModule.controller('accountController', 
['$scope', 'accountFactory', function($scope, accountFactory){
	//Get account info
	$scope.user = accountFactory.getAccountInfo();
	
	$scope.getOriginal = function(){
		$scope.user = accountFactory.getAccountInfo();
	};
	
	$scope.updateAccount = function(){
		accountFactory.updateAccount($scope.user).error(function(error){
			$scope.error = error;
		}).then(function(){
			$scope.$apply(function(){
            	$scope.updateAlert = accountFactory.getUpdateAlert();
            });	
		});
	};
	
}]);