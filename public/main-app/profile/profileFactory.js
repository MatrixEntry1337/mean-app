profileModule.factory('profileFactory', 
[ '$http', 'accountFactory', 'authFactory', function($http, accountFactory, authFactory){
	var profile = {};
	
	profile.data = accountFactory.getProfileInfo();
	
	profile.getProfileInfo = function(){
		return this.data;	
	};
	
	return profile;
}]);