var Dispatcher = require('flux').Dispatcher;
var assign = require('react/lib/Object.assign');
var AppConstants = require('../constants/app-constants');
var PayloadSources = AppConstants.PayloadSources;

var AppDispatcher = assign(new Dispatcher(), {
	handleServerAction: function(action){
		var payload = {
			source: PayloadSources.SERVER_ACTION,
			action: action
		};
		console.log('payload', payload);
		this.dispatch( payload );
	},

	handleViewAction: function(action){
	console.log('action', action);
	this.dispatch({
	  source: PayloadSources.VIEW_ACTION,
	  action: action
	})
	}
});

module.exports = AppDispatcher;
