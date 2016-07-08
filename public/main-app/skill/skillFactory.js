skillModule.factory('skillFactory', 
['$http', 'accountFactory', 'authFactory', function($http, accountFactory, authFactory){
	var skill = {};
	
	skill.data = accountFactory.user.skils;
	
	skill.getSkill = function(){
		return this.data;	
	};
	
	skill.addSkill = function(newSkill){
		return $http.post('/add/skill', newSkill, {
            headers: { Authorization: 'Bearer '+authFactory.getToken() }
        }).success(function(data){
        	skill.data.push(data.skill);
        	skill.addMessage = data.message;
        });
	};
	return skill;
}]);