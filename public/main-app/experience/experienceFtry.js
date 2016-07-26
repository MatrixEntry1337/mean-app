experienceModule.factory('experienceFtry', 
['$http', 'accountFtry', 'authFtry', function($http, accountFtry, authFtry){
	var experience = {};
	experience.data = accountFtry.user.experiences;
	
	experience.getExperience = function(){
		return this.data;
	};
	
	experience.addExperience = function(newExperience){
		return $http.post('/add/experience', newExperience, {
            headers: { Authorization: 'Bearer ' + authFtry.getToken() }
        }).success(function(data){
            experience.data.push(data.exp);
            experience.addMessage = data.message;
        });
	};
	
	return experience;
}]);