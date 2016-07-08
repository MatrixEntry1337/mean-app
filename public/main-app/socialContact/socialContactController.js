socialContactModule.controller('socialContactController', 
[ '$scope', '$uibModal', 'socialContactFactory', function($scope, $uibModal, socialContactFactory){
	$scope.socialContacts = socialContactFactory.getSocialContact();

	//Modal
	$scope.animationsEnabled = true;
	
	$scope.items = { title: 'Social Contact', objects: [{ name:'Social Site', 
	options:[ 'Twitter', 'Facebook', 'Skype', 'Google+' ] }, 
	{ name:'Social Website' }, { name:'Social Name' }]};
	
	$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'main-app/modal/modal-template.html',
			controller: 'modalInstanceCtrl',
			size: size,
			resolve: {
				items: function() {
					return $scope.items;
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