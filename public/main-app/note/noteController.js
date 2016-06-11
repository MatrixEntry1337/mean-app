noteModule.controller('noteController', ['$scope', 'noteFactory', function($scope, noteFactory){
	
	//Notes
    $scope.newNote = {};
    $scope.notes = noteFactory.getNotes();
    
     //Create
    $scope.createNote = function(){
        noteFactory.newNote($scope.newNote).error(function(error){
            $scope.error = error;
        });
    };
    
}]);