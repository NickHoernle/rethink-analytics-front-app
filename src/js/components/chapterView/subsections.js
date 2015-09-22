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
        var selectedUsers = _.filter( me.props.users, {'selected':true});
        var max = 0;
        _.forEach(selectedUsers, function(user) {
            if ( _.find( user.chaptersWorkedOn , {"courseId":me.props.selectedChapter.id}).numberOfCompletedInteractions > max) {
              max = _.find( user.chaptersWorkedOn , {"courseId":me.props.selectedChapter.id}).numberOfCompletedInteractions;
            }
          });
        if ( selectedUsers ) {
          _interactions = _.sortBy( _interactions, 'id' );
          var stopAtInteraction = _interactions[max].id;
          _interactions = _.filter( _interactions, function(interaction){return( interaction.id>subsectionId && interaction.id<(subsectionId+100) && interaction.id < stopAtInteraction);});
          var interactions = _interactions.map( function ( interaction, key ) 
          {
              return (
                <tr><td className="subsectiontd">
                    <div className="chat">
                      <InteractionDisplay interaction={interaction} key={key} users={me.props.users} sessions={me.props.sessions} courseProgress={me.props.courseProgress} selectedChapter={me.props.selectedChapter} />
                    </div>
                </td></tr>  
              );
          });
        }
      if ( interactions.length >= 1 ) {  
        return (
            <div className="chatBackground" key={me.props.key}>
                  <table className="chatBackground">
                    <tbody>
                      <tr><td className="subsectiontd">
                      <br/>
                      <hr className="subsectionrule" />
                      <h className="subsection-heading" style={{fontSize:"18px"}}>{me.props.subsection.headingValue}</h>
                      <hr className="subsectionrule" />
                      <br/>
                      </td></tr>
                      {interactions}
                    </tbody>
                  </table>
            </div>
          );
      }
      return (
          <div className="chatBackground" key={me.props.key}>
                  <table className="chatBackground">
                    <tbody>
                      <tr><td className="subsectiontd">
                        <br/>
                        <hr className="subsectionrule" />
                        <h className="subsection-heading" style={{fontSize:"18px"}}>{me.props.subsection.headingValue}</h>
                        <hr className="subsectionrule" />
                        <br/>
                      </td></tr>
                      <tr><td className="subsectiontd">
                       <p><i>No content entered in this subsection</i></p>
                      </td></tr>
                    </tbody>
                  </table>
            </div>
          );
	  }
});

module.exports = Subsection;