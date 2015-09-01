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
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  
  var TopicCompletionBattery = React.createClass({
 	render:function(){
 		var chapterMapping = this.props.chapterMapping;
 		var name = chapterMapping[this.props.chapter.courseId].name;
 		var grade = chapterMapping[this.props.chapter.courseId].grade;
    var thisDate = new Date(this.props.chapter.lastActiveOnCourse);
    var completion = this.props.chapter.numberOfInteractions;
    var style1 = {
      fontSize:"11px",
      textAlign:"center"
    };
 		return (
      <Panel style={{width:250, height:110}}>
        <div dangerouslySetInnerHTML={createMarkupHeader( name, grade )} style={{height:"40px", fontSize:"14px"}} />
        <ProgressBar now={completion} label='%(percent)s%' bsSize={"xsmall"}  style={{marginBottom:"0px"}}/>
        <div dangerouslySetInnerHTML={createMarkupFooter( thisDate.getDate() + "/" + month[thisDate.getMonth()] + "/" +thisDate.getFullYear() )} style={style1} />
      </Panel>
 		)
 	},
  });

  module.exports = TopicCompletionBattery;