var request = require('superagent');
var AppConstants = require('../constants/app-constants');
var ApiActionCreators = require('../actions/ApiActionCreators');
var NProgress = require('nprogress-npm');
var LoginStore = require('./../stores/LoginStore');

var API_URL = AppConstants.BASE_URL;

var RethinkApiUtils = {
	loadSessions: function( userIdArray, fromDateTime ){
		// build the URL
		var jwt = LoginStore.getJwt();
		var usr = "";
		var URL_Mapping = "";
		for ( usr in userIdArray ) {
			URL_Mapping += "userIds=" + userIdArray[usr] + "&";
		}

		NProgress.start();
		request
		.get(API_URL+"get-user-progress?"+ URL_Mapping + "fromDateTime=" + fromDateTime)
		.set('x-auth-token', jwt)
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
	
	/*
	TODO: Remove this method once no longer used
	*/
	loadUsers: function( userIdArray ){
		var jwt = LoginStore.getJwt();
		// build the URL
		var usr = "";
		var URL_Mapping = "";
		for ( usr in userIdArray ) {
			URL_Mapping += "userIds=" + userIdArray[usr] + "&" ;
		}
		URL_Mapping = URL_Mapping.substring(0,URL_Mapping.length - 1);
		NProgress.start();
		request
		.get(API_URL+'/users?'+URL_Mapping)
		.set("x-auth-token", jwt)
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
				ApiActionCreators.loadUsers( returnObject );
				NProgress.done()
			}
		});
	},

	loadUsersInClass: function( classId ){
		var jwt = LoginStore.getJwt();
		console.log(jwt);
		NProgress.start();
		request
		.get(API_URL+'users-in-class/'+classId)
		.set("x-auth-token", jwt)
		.end(function(error, response){
			if (error){
				if (error.toString().indexOf("Not Found") > 0) {
					console.log("no user found");
				}
				NProgress.done()
			}else{
				// Convert returned string to JSON object
				var returnObject = JSON.parse(response.text);
				ApiActionCreators.loadUsers( returnObject );
				NProgress.done()
			}
		});
	},
	getUserCourseData: function(userId, topicId){
		var jwt = LoginStore.getJwt();
		NProgress.start();
		request
		.get(API_URL+"/users/"+userId+"/topicId/"+topicId)
		.set("x-auth-token", jwt)
		.end(function(error, response){
			if (error){
				NProgress.done();
			}else{
				// Convert returned string to JSON object
				//console.log( API_URL+"/users/"+userId+"/topicId/"+topicId );
				var returnObject = JSON.parse(response.text);
				ApiActionCreators.loadUserCourseData( returnObject );
				NProgress.done();
			}
		})
	},

	markResponse: function( userId, courseProgressId, interactionId, correct ){
		var jwt = LoginStore.getJwt();
		var markedResponse = {
			userId:userId,
			courseProgressId:courseProgressId,
			interactionId:interactionId,
			correct:correct
		};
		NProgress.start();
		request
		.post(API_URL+"/markAnswer" )
		.set("x-auth-token", jwt)
		.send(markedResponse)
		.end(function(error, response){
			if (error){
				console.log("Server error, please try again later")
				NProgress.done();
			}else{
				console.log("Success")
				NProgress.done();
			}
		})
	},
	
	loadChapterInformation: function(){
		var jwt = LoginStore.getJwt();
		NProgress.start();
		request
		.get(API_URL+'/grades')
		.set('x-auth-token', jwt)
		.end(function(error, response){		
			if (error) {
				NProgress.done();
			}else{
				var returnObject = JSON.parse(response.text);
				ApiActionCreators.loadChapters( returnObject )

				NProgress.done();
			}
		});
	}, 	

	loadChapter: function( id ){
		var jwt = LoginStore.getJwt();
		NProgress.start();
		request
		.get(API_URL+'/courses/'+id)
		.set('x-auth-token', jwt)
		.end(function(error, response){		
			if (error) {
				NProgress.done();
			}else{
				var returnObject = JSON.parse(response.text);
				ApiActionCreators.loadChapter( returnObject )
				NProgress.done();
			}
		});
	},

	loadCourseProgress: function( id , classId ){
		var jwt = LoginStore.getJwt();
		NProgress.start();
		request
		.get(API_URL+'get-course-progress/'+id+'/class/' + classId)
		.set('x-auth-token', jwt)
		.end(function(error, response){		
			if (error) {
				NProgress.done();
			}else{
				var returnObject = JSON.parse(response.text);
				ApiActionCreators.loadCourseProgress( returnObject )
				NProgress.done();
			}
		});
	},
};

module.exports = RethinkApiUtils;