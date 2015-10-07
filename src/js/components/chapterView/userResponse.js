var React = require('react');
var _ = require('lodash');

var AppActions = require('../../actions/app-actions');
var AppStore = require('../../stores/app-store');

var _ = require('lodash');
var MarkingButtons = require('./markingButtons');
var ReactBootstrap = require('react-bootstrap'),
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Glyphicon = ReactBootstrap.Glyphicon,
	Button = ReactBootstrap.Button,
	Well = ReactBootstrap.Well,
	Panel = ReactBootstrap.Panel;

var UserResponse = React.createClass({
  	render:function(){
  		var showResponse = false;
  		var activeUsers = _.sortBy( _.filter( this.props.users, {'selected':true}), 'lastActive' ).map( function (user, i) {
	  		var myCourseProgress = _.find( this.props.courseProgress , {"userId" : user.id } );
	  		var lastActive = new Date(user.lastActive);
	  		var myResponse = _.find( myCourseProgress.interactionResponses, {'id': this.props.interactionId} );
	  		var title = user.firstname + " " + user.lastname;// + " : " + lastActive.getDate() + "/" + lastActive.getMonth() + "/" + lastActive.getYear();
	  		showResponse = true;
	  		if ( myResponse ) {
	  			if ( !myResponse.correct ) {
	  				myResponse.correct=0; //undefined
	  			}
	  			var correct;
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
					      		<td align="right"><MarkingButtons user={user.id} courseProgress={myCourseProgress.id} interactionId={this.props.interactionId} /></td>
					      	</tr>
					      </table>
					    </Panel> 
					);
		  		}
		  	}
	  	}, this );
		if ( showResponse ){
	  		return (
	  			<div>{activeUsers}</div>
	  		);
	  	}
	  	return (
	  			<Well bsSize='medium'><i>No selected user responses</i></Well>
	  		);
  	}
});

module.exports = UserResponse;