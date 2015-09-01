var React = require('react');
var AppActions = require('../../actions/app-actions');
var UserButton = require('./userButton');
var ReactBootstrap = require('react-bootstrap'),
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Button = ReactBootstrap.Button,
	Well = ReactBootstrap.Well;

var ClassListSelection = React.createClass({
	handler: function(){

	},
  	render:function(){
  	if (this.props.selectedChapter == null) {
  		return( 
  			<Well bsSize='small'>Please select a chapter</Well>
  		 );
  	} else {
  		var selectedChapter = this.props.selectedChapter;
	  	if ( this.props.users == null ) {
	  		return ( 
	  			<Well bsSize='small'>Cannot load users - Please contact administration on support@rethinkeducation.co.za</Well>
	  			);
	  	}
	  	var userButton = this.props.users.map( function ( user, i ) {
	  		var enabled = false;
	  		for (var ch in user.chaptersCompleted ) {
	  			var chapterCompleted = user.chaptersCompleted[ch];
	  			if ( chapterCompleted.courseId == selectedChapter.id ){
	  				enabled = true;
	  				break;
	  			}
	  		}
  			return (
	  				<UserButton enabled={enabled} name={user.firstname + " " + user.lastname} user={user} key={i}/>
  				);
	  	});
		return(
				<Well bsSize='small'>
					<ButtonToolbar>
						{userButton}
					</ButtonToolbar>
				</Well>
			);
	  	}
	}
});

module.exports = ClassListSelection;
