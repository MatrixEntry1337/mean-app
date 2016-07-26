accountModule.controller('accountCtrl', 
['$scope', 'accountFtry', function($scope, accountFtry){
	//Get account info
	$scope.user = accountFtry.getAccountInfo();
	
	$scope.getOriginal = function(){
		$scope.user = accountFtry.getAccountInfo();
	};
	
	$scope.updateAccount = function(){
		accountFtry.updateAccount($scope.user).error(function(error){
			$scope.error = error;
		}).then(function(){
			$scope.$apply(function(){
            	$scope.updateAlert = accountFtry.getUpdateAlert();
            });	
		});
	};
	
}]);