var React = require("react");
var DateTimeField = require("react-bootstrap-datetimepicker");
var AppStore = require('../../stores/app-store');
//var DayPicker = require('react-day-picker');

var x = 0;

var DayPicker = React.createClass({
	componentDidMount: function(){
		AppStore.addChangeListener(this._onChange);
	},

	componentDidMount: function(){
		AppStore.removeChangeListener(this._onChange);
	},

  	_onChange: function(dateTime){
  		console.log(dateTime);
  	},

  	render: function() {
    	return <DateTimeField onChange={this._onChange} inputFormat="DD/MM/YY" />
  	}
});

module.exports = DayPicker;