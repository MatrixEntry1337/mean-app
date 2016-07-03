skillModule.factory('skillFactory', 
['$http', 'accountFactory', 'authFactory', function($http, accountFactory, authFactory){
	var skill = {};
	
	skill.data = accountFactory.user.skils;
	
	skill.getSkill = function(){
		return this.data;	
	};
	
	return skill;
}]);