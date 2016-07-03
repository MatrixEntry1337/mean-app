educationModule.controller('educationController', 
['$scope', '$uibModal', 'educationFactory', function($scope, $uibModal, educationFactory){
	$scope.education = educationFactory.getEducation();
	
	$scope.newSchool = {};
	
	$scope.addSchool = function(){
		educationFactory.addSchool($scope.newSchool);
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
						{ name: 'School Name' },
						{ name: 'Program Name' }, 
						{ name: 'Description' },
					];
				},
				singleDate: function(){
					return false;
				}
			}
    	});

    	modalInstance.result.then(function(items) {
    		$scope.newSchool.schoolName = items[0].data;
    		$scope.newSchool.program = items[1].data;
    		$scope.newSchool.description = items[2].data;
    		$scope.newSchool.start = items.start;
    		$scope.newSchool.end = items.end;
    		$scope.addSchool();
    	});
	};
	
}]);