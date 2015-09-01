var React = require('react');
var AppActions = require('../../actions/app-actions');
var ReactBootstrap = require('react-bootstrap'),
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Glyphicon = ReactBootstrap.Glyphicon,
	Button = ReactBootstrap.Button,
	Well = ReactBootstrap.Well;

var UserButton = React.createClass({
	handler: function(){
		if ( this.props.user.selected ) {
			AppActions.deselectUser( this.props.user.id );
		} else {
			AppActions.selectUser( this.props.user.id );
		}
	},

  	render:function(){
  		var name = this.props.name;
  		if ( this.props.enabled ) {
  			if ( this.props.user.selected ) {
  				return (
	  				<Button onClick={this.handler}>
	  					<Glyphicon glyph="check" />
	  					{" " + name}
	  				</Button>
  				);
  			} else {
  				return (
	  				<Button onClick={this.handler}>
	  					<Glyphicon glyph="unchecked" />
	  					{" " + name}
	  				</Button>
  				);
  			}
  		} else {
  			return (
  				<Button disabled>
  					<Glyphicon glyph="unchecked" />
	  				{" " + name}
  				</Button>
  			);
  		}
  	}
});

module.exports = UserButton;