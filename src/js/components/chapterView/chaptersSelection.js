var React = require('react');
var _ = require('lodash');
var SelectChapter = require('./selectChapter');
var ReactBootstrap = require('react-bootstrap'),
    DropdownButton = ReactBootstrap.DropdownButton,
    ButtonToolbar = ReactBootstrap.ButtonToolbar,
    Tabs = ReactBootstrap.Tabs,
    ButtonGroup = ReactBootstrap.ButtonGroup,
    Panel = ReactBootstrap.Panel,
    Tab = ReactBootstrap.Tab;


function getFilteredAndSortedChapters( chapters, fromDate, toDate ) {
    var _chapters = _.sortBy( _.filter( chapters, function( ch ) {
       return ch.lastActive > fromDate && ch.lastActive < toDate;
    }), 'lastActive');
    return _chapters;
};

var ChapterSelection = React.createClass({
  render: function() {
    var users = _.map(this.props.users, 'id');
    var chapterMapping = this.props.chapterMapping;
    var now = new Date();
    var lastWeek = new Date();
    var twoWeeksAgo = new Date();
    lastWeek.setDate( now.getDate() - 7 );
    twoWeeksAgo.setDate( now.getDate() - 14 );

    var ChaptersAccessedLastWeek = _.map( getFilteredAndSortedChapters( this.props.chapters, lastWeek, now ), function ( chapter , i ) {
  		if ( chapterMapping[chapter.id] ) {
  			return (
  					<SelectChapter users={users} label={chapterMapping[chapter.id].name + " (" + chapterMapping[chapter.id].grade + ")" } id={chapter.id} key={i} />
  				);
  		}
  	});

    var ChaptersAccessedTwoWeeksAgo = _.map( getFilteredAndSortedChapters( this.props.chapters, twoWeeksAgo, lastWeek), function ( chapter , i ) {
      if ( chapterMapping[chapter.id] ) {
        return (
            <SelectChapter users={users} label={chapterMapping[chapter.id].name + " (" + chapterMapping[chapter.id].grade + ")" } id={chapter.id} key={i} />
          );
      }
    });

    var ChaptersOlderThanThat = _.map( getFilteredAndSortedChapters( this.props.chapters, 0, twoWeeksAgo ), function ( chapter , i ) {
      if ( chapterMapping[chapter.id] ) {
        return (
            <SelectChapter users={users} label={chapterMapping[chapter.id].name + " (" + chapterMapping[chapter.id].grade + ")" } id={chapter.id} key={i} />
          );
      }
    });

    /*var disabled1 = Object.keys( ChaptersAccessedLastWeek ).length;
    var disabled2 = Object.keys( ChaptersAccessedTwoWeeksAgo ).length;
    var disabled3 = Object.keys( ChaptersOlderThanThat ).length;*/

  	return (
        <Tabs defaultActiveKey={1} position='left' tabWidth={3}>
          <Tab eventKey={1} title='Chapters Accessed Last Week'>
            <ButtonGroup vertical style={{height:"180px" , overflowY:"scroll"}}>
              {ChaptersAccessedLastWeek}
            </ButtonGroup>
          </Tab>
          <Tab eventKey={2} title='Chapters Two Weeks Ago'>
            <ButtonGroup vertical style={{height:"180px" , overflowY:"scroll"}}>
              {ChaptersAccessedTwoWeeksAgo}
            </ButtonGroup>
          </Tab>
          <Tab eventKey={3} title='Old Chapters'>
            <ButtonGroup vertical style={{height:"180px" , overflowY:"scroll"}}>
              {ChaptersOlderThanThat}
            </ButtonGroup>
          </Tab>
        </Tabs>
  	);
  }
});

module.exports = ChapterSelection;