notificationModule.factory('nofiticationFactory', 
['$http', 'authFactory', 'accountFactory', function($http, authFactory, accountFactory){
	var notifications = {};
	notifications.data = accountFactory.user.notifications;
	
	//Notifications
    notifications.getNotifications = function(){
      return this.data;  
    };
    
    notifications.getNotificationElapsedTime = function(index){
        var time, temp, elapsed;
        var date = new Date();
        temp = new Date(this.data[index].date);
        elapsed =  date.getTime() - temp.getTime();
        
        time = {seconds: Math.floor(elapsed / 1000), 
            minutes: Math.floor(elapsed / (1000 * 60)), hours: Math.floor(elapsed / (1000*60*60)), 
            day: Math.floor(elapsed / (1000*60*60*24)), month: Math.floor(elapsed / (1000*60*60*24*30)), 
            years: Math.floor(elapsed / (1000*60*60*24*30*12))}; 
        
        return time;
    };
    
    notifications.notificationElapsedTime = function(index){
        var time = this.getNotificationElapsedTime(index);
        if (time.seconds < 60) return time.seconds + "s";
        else if(time.minutes < 60) return time.minutes + "m";
        else if(time.hours < 24) return time.hours + "h " + (time.minutes % 60) + "m";
        else if(time.days < 31) return time.days + "d";
        else if(time.months < 21) return time.months + "mon";
        else return time.years + "years";
    };
    
    return notifications;
    
}]);