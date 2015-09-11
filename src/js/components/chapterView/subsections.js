var React = require('react');
var _ = require('lodash');
var AppActions = require('../../actions/app-actions');
var InteractionDisplay = require('./interactionDisplay');
var UserResponse = require('./userResponse');
var ReactBootstrap = require('react-bootstrap'),
	Panel = ReactBootstrap.Panel,
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Glyphicon = ReactBootstrap.Glyphicon,
	Button = ReactBootstrap.Button,
	Well = ReactBootstrap.Well;

var Subsection = React.createClass({
  	render:function(){
        var me = this;
        var _interactions = me.props.selectedChapter.interactions;
        var headingId = me.props.headingId;
        var subsectionId = me.props.subsection.id * 100;

        var interactions = (_.sortBy(_.filter( _interactions, function( inter ) 
          {
            return ( inter.id > subsectionId && inter.id < subsectionId + 100);
          }),'id' )).map ( function ( interaction, j ) 
            {
              if ( interaction ){
                return (
                  <InteractionDisplay interaction={interaction} key={j} users={me.props.users} sessions={me.props.sessions} courseProgress={me.props.courseProgress} selectedChapter={me.props.selectedChapter} />
                );
              } else {
                return ( null );
              }
            }
        );
              
      return (<div key={me.props.key}>
                <hr/>
                <h style={{fontSize:"18px"}}>{me.props.subsection.headingValue}</h>
                <hr/>
                {interactions}
              </div>
        );
	  }
});

module.exports = Subsection;