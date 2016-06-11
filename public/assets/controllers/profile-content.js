mainModule.controller('ContentProfileController', ['$scope', 
function($scope) {
    $scope.menus = [
        { title: " Overall", className: "fa fa-bar-chart-o", sref: "overall" },
        { title: " Profile", className: "fa fa-user", sref: "profile" },
        { title: " Users", className: "fa fa-group", sref: "users" },
        { title: " My Projects", className: "fa fa-cubes", sref: "projects" },
        { title: " Comments", className: "fa fa-comments", sref: "comments" },
        { title: " History", className: "fa fa-history", sref: "history" },
        { title: " Settings", className: "fa fa-cog", sref: "settings" }
    ];
    
}]);