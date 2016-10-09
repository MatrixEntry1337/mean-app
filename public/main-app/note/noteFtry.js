noteModule.factory('noteFtry', 
['$http', 'authFtry', 'accountFtry', '$log', function($http, authFtry, accountFtry, $log){
	
	var notes = {};
	notes.data = {};
	
	//get notes data
	notes.getData = function(){
	  $log.log("Grabbing notes data!");
	  return notes.data = accountFtry.user.notes;  
	};
	
	//send notes to controller
    notes.getNotes = function(){
        return this.data;
    };
    
    notes.newNote = function(note){
        return $http.post('/create/new/note', note, {
            headers: { Authorization: 'Bearer ' + authFtry.getToken() }
        }).success(function(data){
            notes.data.push(data);
        });
    };
    
    return notes;
}]);