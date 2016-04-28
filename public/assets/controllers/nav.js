app.controller('NavBarController', ['$scope', 
function($scope) { 
    $scope.title = 'This is a MEAN App.';
    $scope.menuContent = [
        { name : "Main 1", subtitles: [
            { title: "Option 1", c1: "Option 1: Content Headline 1", c2: "Option 1: Content Headline 2", c3: "Option 1: Content Headline 3" }, 
            { title: "Option 2", c1: "Option 2: Content Headline 1", c2: "Option 2: Content Headline 2", c3: "Option 2: Content Headline 3" },
            { title: "Option 3", c1: "Option 3: Content Headline 1", c2: "Option 3: Content Headline 2", c3: "Option 3: Content Headline 3" },
            { title: "Option 4", c1: "Option 4: Content Headline 1", c2: "Option 4: Content Headline 2", c3: "Option 4: Content Headline 3" }
            ]},
        { name : "Main 2", subtitles: [
            { title: "Option 1", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" }, 
            { title: "Option 2", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" },
            { title: "Option 3", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" },
            { title: "Option 4", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" }
            ]},
        { name : "Main 3", subtitles: [
            { title: "Option 1", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" }, 
            { title: "Option 2", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" },
            { title: "Option 3", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" },
            { title: "Option 4", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" }
            ]},
        { name : "Main 4", subtitles: [
            { title: "Option 1", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" }, 
            { title: "Option 2", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" },
            { title: "Option 3", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" },
            { title: "Option 4", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" }
            ]},
        { name : "Main 5", subtitles: [
            { title: "Option 1", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" }, 
            { title: "Option 2", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" },
            { title: "Option 3", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" },
            { title: "Option 4", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" }
            ]},
        { name : "Main 6", subtitles: [
            { title: "Option 1", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" }, 
            { title: "Option 2", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" },
            { title: "Option 3", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" },
            { title: "Option 4", c1: "Content Headline", c2: "Content Headline", c3: "Content Headline" }
            ]},
    ];
    
}]);