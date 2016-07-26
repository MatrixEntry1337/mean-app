educationModule.controller('educationCtrl', 
['$scope', '$uibModal', 'educationFtry', function($scope, $uibModal, educationFtry){
	$scope.education = educationFtry.getEducation();
	
	$scope.newSchool = {};
	
	$scope.addSchool = function(){
		educationFtry.addSchool($scope.newSchool);
	};
	//Modal
	$scope.animationsEnabled = true;
	
	$scope.items = { title: 'Education', objects: [{ name:'School Name' }, 
		{ name:'Program Name' }, { name:'Description' }], singleDate: false};
	
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
    		$scope.newSchool.schoolName = items.objects[0].data;
    		$scope.newSchool.program = items.objects[1].data;
    		$scope.newSchool.description = items.objects[2].data;
    		$scope.newSchool.start = items.start;
    		$scope.newSchool.end = items.end;
    		$scope.addSchool();
    	});
	};
	
}]);