var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var ApiActionCreators = {
	loadSessions: function(sessions) {
		AppDispatcher.handleServerAction({
			type : AppConstants.ServerActions.LOAD_SESSION_DATA,
			payload : sessions
		})
	}
};

module.exports = ApiActionCreators;