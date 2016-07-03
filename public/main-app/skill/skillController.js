skillModule.controller('skillController', 
['$scope', 'skillFactory', function($scope, skillFactory){
	$scope.user = skillFactory.getSkill();
	
}]);