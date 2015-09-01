var request = require('superagent');
var API_URL = process.env.API_URL || "http://rethink-testdata.herokuapp.com";
//var API_URL = process.env.API_URL || "http://localhost:8080";
var ApiActionCreators = require('../actions/ApiActionCreators');

var NProgress = require('nprogress-npm');

var AnalyticsApiUtils = {

	loadSessions: function( userIdArray, fromDateTime ){
		// build the URL
		var usr = "";
		var URL_Mapping = "";
		for ( usr in userIdArray ) {
			URL_Mapping += "userIds=" + userIdArray[usr] + "&";
		}

		NProgress.start();
		request
		.get(API_URL+"/get-user-progress?"+ URL_Mapping + "fromDateTime=" + fromDateTime)
		.end(function(error, response){		
			if (error) {
				NProgress.done();
			}else{
				// Convert returned string to JSON object
				var returnObject = JSON.parse(response.text);
				ApiActionCreators.loadSessions( returnObject )
				NProgress.done();
			}
		});
	},
	
	loadUsers: function( userIdArray ){
		// build the URL
		var usr = "";
		var URL_Mapping = "";
		for ( usr in userIdArray ) {
			URL_Mapping += "userIds=" + userIdArray[usr] + "&" ;
		}
		URL_Mapping = URL_Mapping.substring(0,URL_Mapping.length - 1);
		NProgress.start();
		request
		.get(API_URL+'/get-users?'+URL_Mapping)
		.end(function(error, response){
			if (error){
				// If no user found, user unregistered
				if (error.toString().indexOf("Not Found") > 0) {
					//ApiActionCreators.userNotRegistered(userId);
					console.log("no user found");
				}
				NProgress.done()
			}else{
				// Convert returned string to JSON object
				var returnObject = JSON.parse(response.text);
				ApiActionCreators.loadUsers(returnObject);
				NProgress.done()
			}
		});
	},

	getUserCourseData: function(userId, topicId){
		NProgress.start();
		request
		.get(API_URL+"/users/"+userId+"/topicId/"+topicId)
		.end(function(error, response){
			if (error){
				NProgress.done();
			}else{
				// Convert returned string to JSON object
				console.log( API_URL+"/users/"+userId+"/topicId/"+topicId );
				var returnObject = JSON.parse(response.text);
				ApiActionCreators.loadUserCourseData(returnObject);
				NProgress.done();
			}
		})
	},
};
module.exports = AnalyticsApiUtils;
