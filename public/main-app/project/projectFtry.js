projectModule.factory('projectFtry', 
['$http', 'authFtry', 'accountFtry', function($http, authFtry, accountFtry){
	var project;
	
	//Projects
    project.getProjects = function(){
        return this.projects;
    };
    
    return project;
}]);