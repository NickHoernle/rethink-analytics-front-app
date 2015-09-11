var React = require('react');
var _ = require('lodash');
var AppActions = require('../../actions/app-actions');
var ReactBootstrap = require('react-bootstrap'),
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Glyphicon = ReactBootstrap.Glyphicon,
	Button = ReactBootstrap.Button,
	ProgressBar = ReactBootstrap.ProgressBar,
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
  		var course = _.find( this.props.user.chaptersWorkedOn , {'courseId':this.props.selectedChapter.id} );
  		if ( this.props.enabled && course != null ) {
  			if ( this.props.user.selected ) {
  				return (
	  				<Button onClick={this.handler}>
	  					<Glyphicon glyph="check" />
	  					{" " + name}
	  					 <ProgressBar now={ Math.floor( course.numberOfCompletedInteractions * 100 / course.requiredNumberOfInteractions ) } label='%(percent)s%' />
	  				</Button>
  				);
  			} else {
  				return (
	  				<Button onClick={this.handler}>
	  					<Glyphicon glyph="unchecked" />
	  					{" " + name}
	  					 <ProgressBar now={ Math.floor( course.numberOfCompletedInteractions * 100 / course.requiredNumberOfInteractions ) } label='%(percent)s%' />
	  				</Button>
  				);
  			}
  		} else {
  			return (
  				<Button disabled>
  					<Glyphicon glyph="unchecked" />
	  				{" " + name}
	  				<p style={{fontSize:"11px"}}><i>Chapter Not Started</i></p>
  				</Button>
  			);
  		}
  	}
});

module.exports = UserButton;