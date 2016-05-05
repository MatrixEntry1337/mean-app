

app.factory('overVisitFactory', [function(){
    var overObject = {};
    var total = 52147;
    var lastWeek = 1385;
    var thisMonth = 4052;
    var lastMonth = 6048;
    var stats = 67;
    
    overObject.progress = function(){
        var progress = 100 - Math.round((thisMonth/lastMonth) * 100);
        return progress;
    };
    
    overObject.getTotal = function(){
        return total;
    };
    
    overObject.getLastWeek = function(){
        return lastWeek;
    };
    
    overObject.getLastMonth = function(){
        return lastMonth;
    };
    
    overObject.getThisMonth = function(){
        return thisMonth;
    };
    
    overObject.getStats = function(){
        return stats;
    }
    
    return overObject;
}]);

app.controller('overVisitController', ['$scope', 'overVisitFactory',
    function($scope, overVisitFactory){
        $scope.data = {};
        
        $scope.data.total = overVisitFactory.getTotal();
        $scope.data.lastWeek = overVisitFactory.getLastWeek();
        $scope.data.lastMonth = overVisitFactory.getLastMonth();
        $scope.data.progress = overVisitFactory.progress();
        $scope.data.stats = overVisitFactory.getStats();
    }
]);

app.factory('overPageFactory', [function(){
    var overObject = {};
    var total = 324056;
    var lastWeek = 26904;
    var thisMonth = 111041;
    var lastMonth = 124766;
    var stats = 89;
    
    overObject.progress = function(){
        var progress = 100 - Math.round((thisMonth/lastMonth) * 100);
        return progress;
    };
    
    overObject.getTotal = function(){
        return total;
    };
    
    overObject.getLastWeek = function(){
        return lastWeek;
    };
    
    overObject.getLastMonth = function(){
        return lastMonth;
    };
    
    overObject.getThisMonth = function(){
        return thisMonth;
    };
    
    overObject.getStats = function(){
        return stats;
    };

    return overObject;
}]);

app.controller('overPageController', ['$scope', 'overPageFactory',
    function($scope, overPageFactory){
        $scope.data = {};
        
        $scope.data.total = overPageFactory.getTotal();
        $scope.data.lastWeek = overPageFactory.getLastWeek();
        $scope.data.lastMonth = overPageFactory.getLastMonth();
        $scope.data.progress = overPageFactory.progress();
        $scope.data.stats = overPageFactory.getStats();
    }
]);