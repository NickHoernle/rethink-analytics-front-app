var React = require('react');
var _ = require('lodash');
var AppActions = require('../../actions/app-actions');
var UserResponse = require('./userResponse');
var ReactBootstrap = require('react-bootstrap'),
	Panel = ReactBootstrap.Panel,
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Glyphicon = ReactBootstrap.Glyphicon,
	Button = ReactBootstrap.Button,
	Well = ReactBootstrap.Well,
  Popover = ReactBootstrap.Popover;


function createMarkup(value) { 
  return {__html: value}; 
};

function sanitisePicturesInInteraction( unsanitizedInteraction, grade, subject ){
    var baseUrl = "https://res.cloudinary.com/he6wnpmm5/image/upload/v1435228763/";
    var mediaTag = "{media/";
    var sanitizedInteraction = unsanitizedInteraction.replace(/{media.*?}/g, function(match){
      if(match.indexOf("|") >= 0){
        //{media/16_earth_2.png|media/16_earth_2.png
        var mediaFileName = match.substring(mediaTag.length, match.indexOf("|"));
        return '<img src="' + baseUrl + grade + '/' + subject + '/' +  mediaFileName + '" class="img-responsive"/>';
      } else { 
        var mediaFileName = match.substring(mediaTag.length, match.indexOf("}"));
        return '<img src="' + baseUrl + grade + '/' + subject + '/' +  mediaFileName + '" class="img-responsive"/>';
      }
    });
    return sanitizedInteraction;
};

var InteractionDisplay = React.createClass({
  	render:function(){
      var interaction = this.props.interaction;
      var key = this.props.key;
      var me = this;
      var grade = me.props.selectedChapter.grade;
      var subject = me.props.selectedChapter.subject;
      if ( subject == "NATURAL_SCIENCE" ) {
        subject = "NATURAL%20SCIENCE";
      }
      var sanitizedInteraction = sanitisePicturesInInteraction(interaction.value, grade , subject);
      
      switch ( interaction.type ) {
        case "instruction":
          return (
                  <div className="bubble me" key={me.props.key}>
                    <div dangerouslySetInnerHTML={createMarkup(sanitizedInteraction)} />
                  </div>
            );
        case "prompt":
          return (
                  <div>
                    <div className="bubble me" key={me.props.key}>
                      <div dangerouslySetInnerHTML={createMarkup(sanitizedInteraction)} />
                    </div>
                    <div className="bubble you" key={me.props.key}>
                    <UserResponse interactionId={interaction.id} users={me.props.users} sessions={me.props.sessions} courseProgress={me.props.courseProgress} selectedChapter={me.props.selectedChapter} />
                    </div>
                  </div>
              );
        default:
          return (
              <div />
            );
      }
    }
});

module.exports = InteractionDisplay;

                /*<Panel key={key} collapsible bsSize={"small"} defaultExpanded={false} header={<h style={{fontSize:"12px"}}><Glyphicon glyph="chevron-right" />This is an instruction that requires no response. Click to view instruction</h>}>
                  //<div dangerouslySetInnerHTML={createMarkup(sanitizedInteraction)} />
                  }<div>{sanitizedInteraction}</div> 
                </Panel>*/