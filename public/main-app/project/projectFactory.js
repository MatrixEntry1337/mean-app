projectModule.factory('projectFactory', 
['$http', 'authFactory', 'accountFactory', function($http, authFactory, accountFactory){
	var project;
	
	//Projects
    project.getProjects = function(){
        return this.projects;
    };
    
    return project;
}]);