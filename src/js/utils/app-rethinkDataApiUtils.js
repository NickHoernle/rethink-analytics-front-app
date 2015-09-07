var request = require('superagent');
//var API_URL = process.env.API_URL || "http://localhost:8080";
var API_URL = process.env.API_URL || "http://rethink-data.herokuapp.com";
var ApiActionCreators = require('../actions/ApiActionCreators');
var NProgress = require('nprogress-npm');

var RethinkApiUtils = {
	loadChapterInformation: function(){
		NProgress.start();
		request
		.get(API_URL+'/grades')
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
		NProgress.start();
		request
		.get(API_URL+'/courses/'+id)
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

	loadCourseProgress: function( id , userIdArray ){
		var URL_Mapping = "";
		for (var usr in userIdArray ) {
			URL_Mapping += "userIds=" + userIdArray[usr] + "&";
		}
		URL_Mapping = URL_Mapping.substring(0,URL_Mapping.length - 1);
		NProgress.start();
		request
		.get(API_URL+'/get-course-progress/'+id+'/users/?' + URL_Mapping)
		.end(function(error, response){		
			if (error) {
				NProgress.done();
			}else{
				console.log(API_URL+'/get-course-progress/'+id+'/users/?' + URL_Mapping);
				var returnObject = JSON.parse(response.text);
				ApiActionCreators.loadCourseProgress( returnObject )
				NProgress.done();
			}
		});
	},
};

module.exports = RethinkApiUtils;