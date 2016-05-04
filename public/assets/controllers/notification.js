app.factory('NotService', [function(){
    var notObject = {
        notifications:[
            { 
                name: "Kyle Chang Fatt", 
                notice: " has sent you a message.", 
                userImg: "assets/img/testimonials/user.jpg",
                date: new Date('2016', '05', '03')
            },
            { 
                name: "Bob Marley", 
                notice: " started following you.", 
                userImg: "assets/img/testimonials/user.jpg", 
                date: new Date('2016', '04', '02')
            },
            { 
                name: "Peter Tosh", 
                notice: " accepted your invitation.", 
                userImg: "assets/img/testimonials/user.jpg",
                date: new Date('2016', '03', '02')
            },
            { 
                name: "Ziggy Marley", 
                notice: " commented on your timelime.", 
                userImg: "assets/img/testimonials/user.jpg",
                date: new Date('2016', '02', '02')
            },
            { 
                name: "Michael Jackson", 
                notice: " changed profile pictures", 
                userImg: "assets/img/testimonials/user.jpg",
                date: new Date('2016', '03', '02')
            }
        ]
    };
    
    return notObject;
}]);

app.controller('NotController', ['$scope', 'NotService',
function($scope, NotService){
    $scope.notifications=NotService.notifications;
}]);