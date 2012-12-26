
// GLOBAL VARS
var my_client_id = "XXXXXXXXXXXXXXXXXXXXXXX", // YOUR APP ID
	my_secret = "XXXXXXXXXXXXXXXXXXXXXXX", // YOUR APP SECRET 
	my_redirect_uri = "http://www.facebook.com/connect/login_success.html", // LEAVE THIS
	my_type ="user_agent", my_display = "touch"; // LEAVE THIS
 
var facebook_token = "fbToken"; // OUR TOKEN KEEPER



//NOTE: Cordova File api has some issues with file reading in iOS 6
document.addEventListener("deviceready", onDeviceReady, false);
//Activate :active state
document.addEventListener("touchstart", function() {}, false);

function onDeviceReady() {
    var childbrowserApp = new ChildbrowserApp();
	childbrowserApp.run();
}

/*$("#dramalink").click(function()
{
     var childbrowserApp = new ChildbrowserApp();
	childbrowserApp.run();
});*/

function ChildbrowserApp() {
}

ChildbrowserApp.prototype = {
	urlField: null,
   // resultsField: null,
     
	run: function() {
		var that = this,
    		showWebPageButton = document.getElementById("dramalink");
            showWebPageshare = document.getElementById("share");
            showWebPageswitch = document.getElementById("switchlink");
    		//openExternalButton = document.getElementById("openExternalButton");
        
		//that.urlField = "http://www.makedramahappen.com";//
        
       // that.resultsField = document.getElementById("result");
        
		showWebPageButton.addEventListener("click",
										 function() { 
											 window.plugins.childBrowser.showWebPage("http://www.makedramahappen.com",
                                                { showLocationBar: true },
                                                { showAddress : true },
                                                { showNavigationBar : true }); 
										 });
       showWebPageswitch.addEventListener("click",
										 function() { 
											 window.plugins.childBrowser.showWebPage("http://www.thisisswitch.com/",
                                                { showLocationBar: true },
                                                { showAddress : true },
                                                { showNavigationBar : true }); 
										 });
        showWebPageshare.addEventListener("click",
										 function() { 
											 window.plugins.childBrowser.showWebPage("http://www.facebook.com",
                                                { showLocationBar: false },
                                                { showAddress : false },
                                                { showNavigationBar : false }); 
										 });
        
		/*openExternalButton.addEventListener("click",
										function() {
											that._openExternal.call(that);
										});*/
        
        //Childbrowser events
        window.plugins.childBrowser.onClose = function () {
            var message = "[event] onClose raised";
            
            that._addMessageToLog.call(that, message);
        };

        window.plugins.childBrowser.onLocationChange = function (url) {
            var message = "[event] onLocationChange raised with url : " + url ;
            
            that._addMessageToLog.call(that, message);
        };
        
        window.plugins.childBrowser.onOpenExternal = function () {
            var message = "[event] onOpenExternal raised";
            that._addMessageToLog.call(that, message);
        };
	},
    
/*    _showWebPage: function() {
        var that = this,
            url = that.urlField.value;
        //url= "http://www.makedramahappen.com";
		window.plugins.childBrowser.showWebPage(url,
                                                { showLocationBar: true },
                                                { showAddress : true },
                                                { showNavigationBar : true });
    },*/
   
	
 /*   _openExternal: function () {
        var that = this,
            url = that.urlField.value;
        if(device.platform == 'Android') {
            window.plugins.childBrowser.openExternal(url);
        } else {
            that._addMessageToLog.call(that, "Supported only in Android");
        }
		
	},*/
/*
    _addMessageToLog: function(message) {
        var that = this,
            currentMessage = that.resultsField.innerHTML;
        
        that.resultsField.innerHTML =  currentMessage + message + '<br />'; 
    }*/
}