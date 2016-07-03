socialContactModule.controller('socialContactController', 
[ '$scope', 'socialContactFactory', function($scope, socialContactFactory){
	$scope.user = socialContactFactory.getSocialContact();
}]);