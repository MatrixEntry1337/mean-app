noteModule.factory('noteFactory', 
['$http', 'authFactory', 'accountFactory', function($http, authFactory, accountFactory){
	
	var notes = {};
	notes.data = accountFactory.user.notes;
	
	//Notes
    notes.getNotes = function(){
        return this.notes.data;
    };
    
    notes.newNote = function(note){
        return $http.post('/create/new/note', note, {
            headers: { Authorization: 'Bearer '+authFactory.getToken() }
        }).success(function(data){
            notes.data.push(data);
        });
    };
    
    return notes;
}]);