noteModule.controller('noteCtrl', ['$scope', '$uibModal', 'noteFtry', function($scope, $uibModal, noteFtry){
	
	//Notes
    $scope.newNote = {};
    $scope.notes = noteFtry.getNotes();
    
     //Create
    $scope.createNote = function(){
        noteFtry.newNote($scope.newNote).error(function(error){
            $scope.error = error;
        });
    };
    
    //Modal
	$scope.animationsEnabled = true;
	
	$scope.items = { title: 'Notes', objects: [{ name:'Title' }, 
		{ name:'Description' }, { name:'Enter note here...' }] };
	
	$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'main-app/modal/modal-template-form-nodate.html',
			controller: 'modalFormCtrl',
			size: size,
			resolve: {
				items: function() {
					return $scope.items;
				}
			}
    	});

    	modalInstance.result.then(function(items) {
    		$scope.newNote.title = items.objects[0].data;
    		$scope.newNote.summary = items.objects[1].data;
    		$scope.newNote.content = items.objects[2].data;
    		$scope.createNote();
    	});
	};
    
}]);