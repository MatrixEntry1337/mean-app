skillModule.factory('skillFtry', 
['$http', 'accountFtry', 'authFtry', function($http, accountFtry, authFtry){
	var skill = {};
	
	skill.data = accountFtry.user.skils;
	
	skill.getSkill = function(){
		return this.data;	
	};
	
	skill.addSkill = function(newSkill){
		return $http.post('/add/skill', newSkill, {
            headers: { Authorization: 'Bearer '+authFtry.getToken() }
        }).success(function(data){
        	skill.data.push(data.skill);
        	skill.addMessage = data.message;
        });
	};
	return skill;
}]);