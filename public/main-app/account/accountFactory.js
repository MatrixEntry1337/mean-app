accountModule.factory('accountFactory', ['$http', 'authFactory', function($http, authFactory){
	var account = {};
	
	 //Get user info 
    account.getUserInfo = function(){
        $http.get('/retrieve/user/populate', {
            headers: { Authorization: 'Bearer '+authFactory.getToken() }
            }).success(function(data){
            angular.copy(data, account.user);
        });
    };
    
    //Settings info
    account.getSettingsInfo = function(){
        var settingsInfo = {};
        
        settingsInfo.firstName = this.user.firstName;
        settingsInfo.lastName = this.user.lastName;
        settingsInfo.cellPhone = this.user.cellPhone;
        settingsInfo.officePhone = this.user.officePhone;
        settingsInfo.compnayName = this.user.compnayName;
        settingsInfo.state = this.user.state;
        settingsInfo.city = this.user.city;
        
        return settingsInfo;
    };
    
    return account;
}]);