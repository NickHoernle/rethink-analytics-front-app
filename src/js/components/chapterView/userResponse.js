var React = require('react');
var _ = require('lodash');
var AppActions = require('../../actions/app-actions');
var MarkingButtons = require('./markingButtons');
var ReactBootstrap = require('react-bootstrap'),
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Glyphicon = ReactBootstrap.Glyphicon,
	Button = ReactBootstrap.Button,
	Well = ReactBootstrap.Well,
	Panel = ReactBootstrap.Panel;

var UserResponse = React.createClass({
  	render:function(){
  		var me = this;
  		var activeUsers = _.sortBy( _.filter( this.props.users, {'selected':true}), 'lastActive' ).map( function (user, i) {
	  		var myCourseProgress = me.props.courseProgress[user.id];
	  		var myResponse = _.find( myCourseProgress.interactionResponses, {'id': me.props.interactionId} );
	  		var title = user.firstname + " " + user.lastname + " : " + user.lastActive;
	  		if ( myResponse ) {
	  			if ( !myResponse.correct ) {
	  				myResponse.correct=0; //undefined
	  			}
		  		if ( myResponse.response ) {
		  				switch (myResponse.correct){
		  					case 0: //undefined or don't know
		  						correct='primary';
		  						break;
		  					case 1: //correct
		  						correct='success';
		  						break;
		  					case 2: //incorrect
		  						correct='warning';
		  						break;
		  				}
		  			return (
				  		<Panel header={title} bsStyle={correct}>
					      <table style={{width:"100%"}}>
					      	<tr>
					      		<td>{myResponse.response}</td>
					      		<td align="right"><MarkingButtons user={user.id} courseProgress={myCourseProgress.id} interactionId={me.props.interactionId} /></td>
					      	</tr>
					      </table>
					    </Panel> 
					);
		  		}
		  	}
	  	});
  		return (
  			<Well>{activeUsers}</Well>
  		);
  	}
});

module.exports = UserResponse;