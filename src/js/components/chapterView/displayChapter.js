var React = require('react');
var _ = require('lodash');
var AppActions = require('../../actions/app-actions');
var UserResponse = require('./userResponse');
var Sections = require('./sections');
var ReactBootstrap = require('react-bootstrap'),
	Panel = ReactBootstrap.Panel,
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Glyphicon = ReactBootstrap.Glyphicon,
	Button = ReactBootstrap.Button,
	Well = ReactBootstrap.Well;

var DisplayChapter = React.createClass({
  	render:function(){
      var me = this;
  		if( me.props.selectedChapter == null ) {
  			return (
  				null
  			);
  		}
  		else {
        return(
            <Sections selectedChapter={me.props.selectedChapter} users={me.props.users} sessions={me.props.sessions} courseProgress={me.props.courseProgress}/>
          );
	  	}
  	}
});

module.exports = DisplayChapter;