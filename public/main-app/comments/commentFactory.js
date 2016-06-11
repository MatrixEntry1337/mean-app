commentModule.factory('commentFactory',
['$http', 'authFactory', 'accountFactory', function($http, authFactory, accountFactory){
	var comments = {}
	
	return comments;
}]);