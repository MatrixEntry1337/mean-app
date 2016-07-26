educationModule.factory('educationFtry', 
['$http', 'accountFtry', 'authFtry', function($http, accountFtry, authFtry){
	var education = {};
	education.data = accountFtry.user.education;
	
	education.getEducation = function(){
		return this.data;
	};
	
	education.addSchool = function(newSchool){
		return $http.post('/add/school', newSchool, {
            headers: { Authorization: 'Bearer ' + authFtry.getToken() }
        }).success(function(data){
            education.data.push(data.class);
            education.addMessage = data.message;
        });
	};
	
	return education;
}]);