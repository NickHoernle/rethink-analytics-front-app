var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var ApiActionCreators = {
	loadSessions: function( sessions ) {
		AppDispatcher.handleServerAction({
			type : AppConstants.ServerActions.LOAD_SESSION_DATA,
			payload : sessions
		});
	},
	loadChapters: function( chapters ) {
		AppDispatcher.handleServerAction({
			type : AppConstants.ServerActions.LOAD_CHAPTERS_DATA,
			payload : chapters
		});
	},
	loadUsers: function( users ) {
		AppDispatcher.handleServerAction({
			type : AppConstants.ServerActions.LOAD_USERS_DATA,
			payload : users
		});
	},	
	loadChapter: function( chapter ) {
		AppDispatcher.handleServerAction({
			type : AppConstants.ServerActions.LOAD_CHAPTER,
			payload : chapter
		});
	},
	loadCourseProgress: function( courseProgresses ){
		AppDispatcher.handleServerAction({
			type : AppConstants.ServerActions.LOAD_COURSE_PROGRESS,
			payload : courseProgresses
		})
	},
};

module.exports = ApiActionCreators;