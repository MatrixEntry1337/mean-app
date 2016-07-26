noteModule.factory('noteFtry', 
['$http', 'authFtry', 'accountFtry', function($http, authFtry, accountFtry){
	
	var notes = {};
	notes.data = accountFtry.user.notes;
	
	//Notes
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