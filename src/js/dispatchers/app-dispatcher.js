var Dispatcher = require('flux').Dispatcher;
var assign = require('react/lib/Object.assign');
var AppConstants = require('../constants/app-constants');
var PayloadSources = AppConstants.PayloadSources;
var LoginConstants = require('../constants/app-constants');

var AppDispatcher = assign(new Dispatcher(), {
	handleServerAction: function(action){
		var payload = {
			source: PayloadSources.SERVER_ACTION,
			action: action
		};
		this.dispatch( payload );
	},

	handleLoginAction: function(action){
		var payload = {
			source: LoginConstants.LOGIN_USER,
			action: action
		};
		this.dispatch( payload );
	},

	handleViewAction: function(action){
		this.dispatch({
		  source: PayloadSources.VIEW_ACTION,
		  action: action
		})
	}
});

module.exports = AppDispatcher;
