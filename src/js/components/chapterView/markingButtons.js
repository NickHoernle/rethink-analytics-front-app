var React = require('react');
var AppActions = require('../../actions/app-actions');
var RethinkApiUtils = require('../../utils/app-rethinkDataApiUtils');

var ReactBootstrap = require('react-bootstrap'),
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Glyphicon = ReactBootstrap.Glyphicon,
	Button = ReactBootstrap.Button,
	Well = ReactBootstrap.Well;

var MarkingButton = React.createClass({
	handlerCorrect: function(){
		console.log( this.props.courseProgress );
		AppActions.markResponse( this.props.user, this.props.courseProgress, this.props.interactionId, 1);
		RethinkApiUtils.markResponse( this.props.user, this.props.courseProgress, this.props.interactionId, 1);
	},

	handlerIncorrect: function(){
		AppActions.markResponse( this.props.user, this.props.courseProgress, this.props.interactionId, 2);
		RethinkApiUtils.markResponse( this.props.user, this.props.courseProgress, this.props.interactionId, 2);
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