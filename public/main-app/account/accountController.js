accountModule.controller('accountController', 
['$scope', 'accountFactory', function($scope, accountFactory){
	//Get account info
	$scope.user = accountFactory.getAccountInfo();
	
	$scope.getOriginal = function(){
		$scope.user = accountFactory.getAccountInfo();
	};
	
	//Changes
	$scope.changesMade = false;
	$scope.changes = function(){
		return this.changesMade;
	};
	
	$scope.updateAccount = function(){
		var original = accountFactory.getAccountInfo();
		
		if(!(JSON.stringify(original) === JSON.stringify($scope.user))){
			accountFactory.updateAccount($scope.user);
			this.changesMade = true;
		}
		else this.changesMade = false;
	};
	
}]);