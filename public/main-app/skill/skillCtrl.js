skillModule.controller('skillCtrl', 
['$scope', '$uibModal', 'skillFtry', function($scope, $uibModal, skillFtry){
	
	$scope.newSkill = {};
	$scope.skills = skillFtry.getSkill();
	
	
	//Modal
	$scope.animationsEnabled = true;
	
	$scope.items = { title: 'Skills', objects: [{ name:'Skill Name'}, 
	{ name:'Skill Level' }]};
	
	$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'main-app/modal/modal-template-addskill.html',
			controller: 'modalInstanceCtrl',
			size: size,
			resolve: {
				items: function() {
					return $scope.items;
				}
			}
    	});

    	modalInstance.result.then(function(items) {
    		$scope.newSkill.skillName = items[0].data;
    		$scope.newSkill.skillLevel = items[1].data;
    		$scope.addSkill();
    	});
	};
		
}]);