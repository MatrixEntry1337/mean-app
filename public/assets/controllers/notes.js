app.factory('noteFactory', [function(){
    var noteObject = {};
    var notes = [
        {
            id: '01',
            title: 'CRUD', 
            summary: 'Create, read, update, and delete',
            color: 'color-one'
        },
        {
            id: '02',
            title: 'RESTful',
            summary: 'Input text here',
            color: 'color-two'
        },
        {
            id: '03',
            title: 'MongoDB',
            summary: 'Input text here',
            color: 'color-three'
        },
        {
            id: '04',
            title: 'Express.js',
            summary: 'Input text here',
            color: 'color-four'
        },
        {
            id: '05',
            title: 'Angularjs',
            summary: 'Input text here',
            color: 'color-five'
        },
        {
            id: '06',
            title: 'Nodejs',
            summary: 'Input text here',
            color: 'color-six'
        },
        {
            id: '07',
            title: 'Angular Controller',
            summary: 'Input text here',
            color: 'color-seven'
        },
        {
            id: '08',
            title: 'Angular Service',
            summary: 'Factory, Service, and Provider',
            color: 'color-one'
        }
        
    ];
    
    noteObject.getNotes = function(){
        return notes;    
    };
    
    return noteObject;
}]);

app.controller('noteController', ['$scope', 'noteFactory', 
function($scope, noteFactory){
    $scope.notes = noteFactory.getNotes();
}]);