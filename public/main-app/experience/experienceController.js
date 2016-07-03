experienceModule.controller('experienceController', 
['$scope', '$uibModal', 'experienceFactory', '$log', function($scope, $uibModal, experienceFactory, $log){
	
	$scope.newExperience = {};
	$scope.experiences = experienceFactory.getExperience();
	
	$scope.addExperience = function(){
		experienceFactory.addExperience($scope.newExperience).error(function(error){
            $scope.regError = error;
        });
	};
	
	//Modal
	$scope.animationsEnabled = true;
	
	$scope.open = function (size) {

	    var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'main-app/modal/modal-template.html',
			controller: 'modalInstanceCtrl',
			size: size,
			resolve: {
				items: function() {
					return [
						{ name: 'Company Name' },
						{ name: 'Role' }, 
						{ name: 'Description' },
					];
				},
				singleDate: function(){
					return false;
				}
			}
    	});

    	modalInstance.result.then(function(items) {
    		$scope.newExperience.companyName = items[0].data;
    		$scope.newExperience.role = items[1].data;
    		$scope.newExperience.description = items[2].data;
    		$scope.newExperience.start = items.start;
    		$scope.newExperience.end = items.end;
    		$scope.addExperience();
    	});
	};
	
}]);
