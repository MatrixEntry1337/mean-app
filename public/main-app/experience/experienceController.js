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
	
	$scope.items = { title: 'Experience', objects: [{ name:'Company Name' }, 
		{ name:'Role' }, { name:'Description' }], singleDate: false};
	
	$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'main-app/modal/modal-template-form.html',
			controller: 'modalFormCtrl',
			size: size,
			resolve: {
				items: function() {
					return $scope.items;
				}
			}
    	});

    	modalInstance.result.then(function(items) {
    		$scope.newExperience.companyName = items.objects[0].data;
    		$scope.newExperience.role = items.objects[1].data;
    		$scope.newExperience.description = items.objects[2].data;
    		$scope.newExperience.start = items.start;
    		$scope.newExperience.end = items.end;
    		$scope.addExperience();
    	});
	};
	
}]);
