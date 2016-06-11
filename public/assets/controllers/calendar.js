app.factory('calendar', [ function(){
	var calendar = {}
	
	calendar.eachYear = [
		{ month: 'January', days: 31 },
		{ month: 'February', days: 28 },
		{ month: 'March', days: 31 },
		{ month: 'April', days: 30 },
		{ month: 'May', days: 31 },
		{ month: 'June', days: 30 },
		{ month: 'July', days: 31 },
		{ month: 'August', days: 31 },
		{ month: 'September', days: 30 },
		{ month: 'October', days: 31 },
		{ month: 'November', days: 30 },
		{ month: 'December', days: 31 },
		];
	
	calendar.leapYear = function(year){
		if(year % 4 == 0) return true;
		return false
	};
	
	return calendar;
}]);

app.controller('calendarController', ['$scope', 'calendar', function($scope, calendar){
	
	$scope.currentMonth = [];
	
	$scope.nextMonth = function(month, prevDay, year){
		var firstDays, remainingDays, days, weeks;
		
		$scope.currentMonth = {};
		
		//Leap Year
		if(calendar.leapYear(year) && month == 2) days = 29;
		else days = calendar.eachYear[month].days;
		
		//
		firstDays = 7 - prevDay;
		if(firstDays > 0) $scope.currentMonth.push({days: firstDays});
		
		days = days - firstDays;
		weeks = Math.floor(days / 7);
		remainingDays  = days - (weeks * 7);
		 
		for(var i = 0; i < weeks; i++) $scope.currentMonth.push({days: 7});
		
		if(remainingDays > 0) $scope.currentMonth.push({days: remainingDays});
	};
	
	$scope.prevMonth = function(month, lastDay){
		
	};
}]);