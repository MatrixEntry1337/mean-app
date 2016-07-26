socialContactModule.factory('socialContactFtry', 
['$http', 'accountFtry', 'authFtry', function($http, accountFtry, authFtry){
	var socialContact = {};
	
	socialContact.data = accountFtry.user.socialContacts;
	
	socialContact.getSocialContact = function(){
		return this.data;
	};
	
	// socialContact.addSocialContact = function(social){
	// 	return $http.post('/add/social');
	// };
	
	return socialContact;
}]);