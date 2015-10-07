var React = require('react');
var _ = require('lodash');
var ReactBootstrap = require('react-bootstrap'),
	Panel = ReactBootstrap.Panel,
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Glyphicon = ReactBootstrap.Glyphicon,
	Button = ReactBootstrap.Button,
	Well = ReactBootstrap.Well;

var AppActions = require('../../actions/app-actions');
var InteractionDisplay = require('./interactionDisplay');
var UserResponse = require('./userResponse');
var AppStore = require('../../stores/app-store');


var Subsection = React.createClass({
  	render:function(){
        
        var _interactions = this.props.selectedChapter.interactions;
        var headingId = this.props.headingId;
        var subsectionId = this.props.subsection.id * 100;
        var selectedUsers = _.filter( this.props.users, {'selected':true});
        var max = 0;

        /*If there are selected users*/
        if ( selectedUsers ) {
          /*Get the maximum number of interactions completed by a user*/
          var max = 0;
          _.forEach(selectedUsers, function(user) {
            if ( _.find( user.chaptersWorkedOn , {"courseId":this.props.selectedChapter.id}).numberOfCompletedInteractions > max) {
              max = _.find( user.chaptersWorkedOn , {"courseId":this.props.selectedChapter.id}).numberOfCompletedInteractions;
            }
          }, this );
          if ( max > _interactions.length ) { max = _interactions.length -1; }
          _interactions = _.sortBy( _interactions, 'id' );
          var stopAtInteraction = _interactions[max].id;
          _interactions = _.filter( _interactions, function(interaction){return( interaction.id>subsectionId && interaction.id<(subsectionId+100) && interaction.id < stopAtInteraction);});
          var interactions = _interactions.map( function ( interaction, key ) 
          {
              return (
                <tr><td className="subsectiontd">
                    <div className="chat">
                      {<InteractionDisplay interaction={interaction} key={key} {...this.props} />}
                    </div>
                </td></tr>  
              );
          }, this);
        }
      if ( interactions.length >= 1 ) {  
        return (
            <div className="chatBackground" key={this.props.key}>
                  <table className="chatBackground">
                    <tbody>
                      <tr><td className="subsectiontd">
                      <br/>
                      <hr className="subsectionrule" />
                      <h className="subsection-heading" style={{fontSize:"18px"}}>{this.props.subsection.headingValue}</h>
                      <hr className="subsectionrule" />
                      <br/>
                      </td></tr>
                      {interactions}
                    </tbody>
                  </table>
            </div>
          );
      }

      /*No selected users to display*/
      return (
          <div className="chatBackground" key={this.props.key}>
                  <table className="chatBackground">
                    <tbody>
                      <tr><td className="subsectiontd">
                        <br/>
                        <hr className="subsectionrule" />
                        <h className="subsection-heading" style={{fontSize:"18px"}}>{this.props.subsection.headingValue}</h>
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