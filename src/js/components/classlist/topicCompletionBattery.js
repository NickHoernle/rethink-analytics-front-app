var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
  Button = ReactBootstrap.Button,
  Table = ReactBootstrap.Table,
  ProgressBar = ReactBootstrap.ProgressBar,
  ButtonToolbar = ReactBootstrap.ButtonToolbar,
  Panel = ReactBootstrap.Panel;

  function createMarkupHeader( name, grade ) { return {__html: '<b>Grade ' + grade + ':</b><br/>' + name }; };
  function createMarkupFooter( date ) { return {__html: '<i>' + date + '</i>'}; };

  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  
  var TopicCompletionBattery = React.createClass({
 	render:function(){
    if ( this.props.chapter ) {
   		var chapterMapping = this.props.chapterMapping;
   		var name = chapterMapping[this.props.chapter.courseId].name;
   		var grade = chapterMapping[this.props.chapter.courseId].grade;
      var thisDate = new Date(this.props.chapter.lastActiveOnCourse);
      var completion = Math.floor( this.props.chapter.numberOfCompletedInteractions / this.props.chapter.requiredNumberOfInteractions * 100 );
      if ( completion > 100 ){ completion = 100 } // bug to be caught
      var style1 = {
        fontSize:"11px",
        textAlign:"center"
      };
   		return (
        <Panel bsSize={"xsmall"} style={{marginBottom:"0px", width:250}}>
          <div dangerouslySetInnerHTML={createMarkupHeader( name, grade )} style={{ marginTop:"0px", fontSize:"11px"}} />
          <ProgressBar now={completion} label='%(percent)s%' bsSize={"xsmall"}  style={{marginBottom:"0px"}}/>
          <div dangerouslySetInnerHTML={createMarkupFooter( thisDate.getDate() + "/" + month[thisDate.getMonth()] + "/" +thisDate.getFullYear() )} style={style1} />
        </Panel>
   		);
    }
    return ( null );
 	},
  });

  module.exports = TopicCompletionBattery;