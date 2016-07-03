accountModule.factory('accountFactory', ['$http', 'authFactory', '$log', 
function($http, authFactory, $log){
	var account = {};
	account.user = {};
	
	account.passwordAlert;
	account.updateAlert;
	
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
    
    account.getUpdateAlert = function(){
        return this.updateAlert;
    };
    
    //account page info
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
    
    //profile page info
    account.getProfileInfo = function(){
        return {
            firstName: account.user.firstName,
            lastName: account.user.lastName,
            job: account.user.job,
            position: account.user.position,
            socialContacts: account.user.socialContacts,
            skills: account.user.skills,
            experiences: account.user.experiences,
            education: account.user.education
        };  
    };
    
    //Update Account
    account.updateAccount = function(accountInfo){
        $http.post('/update/account', accountInfo, {
        headers: { Authorization: 'Bearer '+authFactory.getToken() }
        }).success(function(data){
                
            account.updateAlert = data.message;    
                
            //name
            account.user.firstName = data.user.firstName;
            account.user.lastName = data.user.lastName;
            //companyName
            account.user.companyName = data.user.companyName;
            //mobile phone
            account.user.cellPhone = data.user.cellPhone;
            //company phone
            account.user.officePhone = data.user.officePhone;
            //email
            account.user.email = data.user.email;
            //address
            account.user.line1 = data.user.line1;
            account.user.line2 = data.user.line2;
            account.user.city = data.user.city;
            account.user.state = data.user.state;
            account.user.zip = data.user.zip;
        });
    };
    
    
    return account;
}]);