var React = require('react');
var AppActions = require('../../actions/app-actions');
var UserButton = require('./userButton');
var ReactBootstrap = require('react-bootstrap'),
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Button = ReactBootstrap.Button,
	Well = ReactBootstrap.Well;

var ClassListSelection = React.createClass({
  getInitialState: function() {
      return ( {bsStyle:"success",
                text:"Select all users"} );
  },

  clickHandler: function() {
    if( this.state.bsStyle == "success") {
      this.setState({bsStyle:"warning",
                      text:"Deselect all users"
      });
      var enabledUsers = this.props.users.map( function ( user, i ) {
      for (var ch in user.chaptersWorkedOn ) {
        var chapterCompleted = user.chaptersWorkedOn[ch];
        if ( chapterCompleted.courseId == this.props.selectedChapter.id ){
          if ( chapterCompleted.numberOfCompletedInteractions > 5 ) {
            return (
              user.id
            );
            break;
          }
        }
      }
      return (
          null
        );
      }, this);
      //console.log( enabledUsers );
      AppActions.selectAllUsers( enabledUsers );
    } else {
      this.setState({bsStyle:"success",
                      text:"Select all users"});
      AppActions.deselectAllUsers();
    }
  },

  render:function(){
  	if (this.props.selectedChapter == null) {
  		return( 
  			<Well bsSize='small'>Please select a chapter</Well>
  		 );
  	}

    var selectedChapter = this.props.selectedChapter;
  	if ( this.props.users == null ) {
  		return ( 
  			<Well bsSize='small'>Cannot load users - Please contact administration on support@rethinkeducation.co.za</Well>
  		);
  	}

  	var userButton = this.props.users.map( function ( user, i ) {
  		var enabled = false;
  		for (var ch in user.chaptersWorkedOn ) {
  			var chapterCompleted = user.chaptersWorkedOn[ch];
  			if ( chapterCompleted.courseId == selectedChapter.id ){
  				if ( chapterCompleted.numberOfCompletedInteractions > 5 ) {
  					enabled = true;
  					break;
  				}
  			}
  		}
			return (
  				<UserButton enabled={enabled} name={user.firstname + " " + user.lastname} user={user} selectedChapter={selectedChapter} key={i}/>
				);
  	});
    
    return(
			<Well bsSize='small'>
				<ButtonToolbar>
            <Button onClick={this.clickHandler} bsStyle={this.state.bsStyle}>
              {this.state.text}
            </Button>
					{userButton}
				</ButtonToolbar>
			</Well>
		);
  }
});

module.exports = ClassListSelection;
