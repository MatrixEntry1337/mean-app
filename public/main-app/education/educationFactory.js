educationModule.factory('educationFactory', 
['$http', 'accountFactory', 'authFactory', function($http, accountFactory, authFactory){
	var education = {};
	education.data = accountFactory.user.education;
	
	education.getEducation = function(){
		return this.data;
	};
	
	education.addSchool = function(newSchool){
		return $http.post('/add/school', newSchool, {
            headers: { Authorization: 'Bearer ' + authFactory.getToken() }
        }).success(function(data){
            education.data.push(data.class);
            education.addMessage = data.message;
        });
	};
	
	return education;
}]);