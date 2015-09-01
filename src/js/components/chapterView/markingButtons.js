var React = require('react');
var AppActions = require('../../actions/app-actions');
var ReactBootstrap = require('react-bootstrap'),
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Glyphicon = ReactBootstrap.Glyphicon,
	Button = ReactBootstrap.Button,
	Well = ReactBootstrap.Well;

var MarkingButton = React.createClass({
	handlerCorrect: function(){
		AppActions.markResponseAsCorrect( this.props.user, this.props.courseProgress, this.props.interactionId);
	},

	handlerIncorrect: function(){
		AppActions.markResponseAsIncorrect( this.props.user, this.props.courseProgress, this.props.interactionId);
	},

  	render:function(){
  		return ( 
  			<div style={{textAlign:"right"}}>
  				<Button  bsStyle='success' bsSize='xsmall' onClick={this.handlerCorrect}><Glyphicon glyph="ok" /></Button>
  				<Button  bsStyle='danger' bsSize='xsmall' onClick={this.handlerIncorrect}><Glyphicon glyph="remove" /></Button>
  			</div>
  		 );
  	}
});

module.exports = MarkingButton;