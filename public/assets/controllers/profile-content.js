app.controller('ContentProfileController', ['$scope', 
function($scope) {
    $scope.menus = [
        { title: " Overall", className: "fa fa-bar-chart-o" },
        { title: " Profile", className: "fa fa-user" },
        { title: " Users", className: "fa fa-group" },
        { title: " My Projects", className: "fa fa-cubes" },
        { title: " Comments", className: "fa fa-comments" },
        { title: " History", className: "fa fa-history" },
        { title: " Settings", className: "fa fa-cog" }
    ];
    
}]);