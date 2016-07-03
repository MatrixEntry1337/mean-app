experienceModule.factory('experienceFactory', 
['$http', 'accountFactory', 'authFactory', function($http, accountFactory, authFactory){
	var experience = {};
	experience.data = accountFactory.user.experiences;
	
	experience.getExperience = function(){
		return this.data;
	};
	
	experience.addExperience = function(newExperience){
		return $http.post('/add/experience', newExperience, {
            headers: { Authorization: 'Bearer ' + authFactory.getToken() }
        }).success(function(data){
            experience.data.push(data.exp);
            experience.addMessage = data.message;
        });
	};
	
	return experience;
}]);