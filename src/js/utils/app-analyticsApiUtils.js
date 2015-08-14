var request = require('superagent');
var API_URL = process.env.API_URL || "http://localhost:8080";
var ApiActionCreators = require('../actions/ApiActionCreators');

var NProgress = require('nprogress-npm');

var AnalyticsApiUtils = {

	loadSessions: function(userIdArray, fromDateTime){
		// build the URL
		var usr = "";
		var URL_Mapping = "";
		for ( usr in userIdArray ) {
			URL_Mapping += "userIds=" + userIdArray[usr] + "&";
		}

		NProgress.start();
		console.log(API_URL+"/get-user-progress?"+ URL_Mapping + "fromDateTime=" + fromDateTime);
		request
		.get(API_URL+"/get-user-progress?"+ URL_Mapping + "fromDateTime=" + fromDateTime)
		.end(function(error, response){		
			if (error) {
				NProgress.done();
			}else{
				// Convert returned string to JSON object
				var returnObject = JSON.parse(response.text);
				
				//ApiActionCreators.loadUser(returnObject);
				//ApiActionCreators.promoteSponsor(returnObject.sponsorId);
				//console.log( returnObject );

				ApiActionCreators.loadSessions( returnObject )

				NProgress.done();
			}
		});
	}
};
module.exports = AnalyticsApiUtils;
