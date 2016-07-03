modalModule.controller('modalInstanceCtrl', 
['$scope', '$uibModalInstance', 'items', 'singleDate', 
function($scope, $uibModalInstance, items, singleDate) {

	$scope.items = items;
	
	$scope.singleDate = function(){
		return singleDate;	
	};
	
	$scope.submit = function () {
    	$uibModalInstance.close($scope.items);
	};

	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
    	$scope.items = {};
	};
	
	//Datepicker--Date
	$scope.popupDate = { opened: false };
	
	$scope.openDate = function() {
    	$scope.popupDate.opened = true;
    };
	
	//Datepicker--Start
	$scope.popupStart = { opened: false };
	
	$scope.openStart = function() {
    	$scope.popupStart.opened = true;
    };
    
    //Datepicker--End
    $scope.popupEnd = { opened: false };
    
    $scope.openEnd = function(){
    	$scope.popupEnd.opened = true;	
    };
    
    //DatePicker--options
    $scope.dateOptions = {
	    formatYear: 'yy',
	    maxDate: new Date(2020, 5, 22),
	    minDate: new Date(1920, 1 , 1),
	    startingDay: 1
	};
	
}]);