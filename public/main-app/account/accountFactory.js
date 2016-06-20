accountModule.factory('accountFactory', ['$http', 'authFactory', '$log', function($http, authFactory, $log){
	var account = {};
	account.user = {};
	
	account.passwordAlert;
	
	 //Get user info 
    account.getUserInfo = function(){
        $http.get('/retrieve/user/populate', {
            headers: { Authorization: 'Bearer '+authFactory.getToken() }
            }).success(function(data){
            angular.copy(data, account.user);
        });
    };
    
    account.changePassword = function(verification){
        $http.post('/change/password', verification, {
            headers: { Authorization: 'Bearer '+authFactory.getToken() }
        }).success(function(data){
            account.passwordAlert = data.message;
        });
         
    };
    
    account.getPasswordAlert = function(){
        return this.passwordAlert;  
    };
    
    //All Info
    account.getAccountInfo = function(){
        return { 
            firstName: account.user.firstName, 
            lastName: account.user.lastName,
            email: account.user.email,
            companyName: account.user.companyName,
            cellPhone: account.user.cellPhone,
            officePhone: account.user.officePhone,
            line1: account.user.line1,
            line2: account.user.line2,
            city: account.user.city,
            state: account.user.state,
            zip: account.user.zip
        };
    };
    
    //Update Account
    account.updateAccount = function(accountInfo){
        $http.post('/update/account', accountInfo, {
            headers: { Authorization: 'Bearer '+authFactory.getToken() }
            }).success(function(data){
            
            //name
            if(data.firstName) account.user.firstName = data.firstName;
            if(data.lastName) account.user.lastName = data.lastName;
            
            //companyName
            if(data.companyName) account.user.companyName = data.companyName;
            
            //mobile phone
            if(data.cellPhone) account.user.cellPhone = data.cellPhone;
            
            //company phone
            if(data.officePhone) account.user.officePhone = data.officePhone;
            
            //email
            if(data.email) account.user.email = data.email;
            
            //address
            if(data.line1) account.user.line1 = data.line1;
            if(data.line2) account.user.line2 = data.line2;
            if(data.city) account.user.city = data.city;
            if(data.state) account.user.state = data.state;
            if(data.zip) account.user.zip = data.zip;
        });
    };
    
    
    return account;
}]);