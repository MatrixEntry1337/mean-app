var app = angular.module('kyle-mean-app', []);

app.controller('MainCtrl', ['$scope', 
function($scope){
  $scope.test = "Hello world it's Kyle!";
}]);