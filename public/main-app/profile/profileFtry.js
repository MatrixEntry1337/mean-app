profileModule.factory('profileFtry', 
[ '$http', 'accountFtry', 'authFtry', function($http, accountFtry, authFtry){
	var profile = {};
	
	profile.data = accountFtry.getProfileInfo();
	
	profile.getProfileInfo = function(){
		return this.data;	
	};
	
	return profile;
}]);