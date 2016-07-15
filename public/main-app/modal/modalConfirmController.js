modalModule.controller('modalConfirmCtrl', 
['$scope', '$uibModalInstance', 'items', 
function($scope, $uibModalInstance, items) {
	
	$scope.items = items;
	
	$scope.accept = function(){
		$uibModalInstance.close(true);
	};
	
	$scope.deny = function(){
		$uibModalInstance.close(false);
	};
	
	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
    	$scope.items = {};
	};
	
}]);