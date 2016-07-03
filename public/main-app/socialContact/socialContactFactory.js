socialContactModule.factory('socialContactFactory', 
['$http', 'accountFactory', 'authFactory', function($http, accountFactory, authFactory){
	var socialContact = {};
	
	socialContact.data = accountFactory.user.socialContacts;
	
	socialContact.getSocialContact = function(){
		return this.data;
	};
	
	return socialContact;
}]);