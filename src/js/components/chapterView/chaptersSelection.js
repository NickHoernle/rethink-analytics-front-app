var React = require('react');
var _ = require('lodash');
var ReactBootstrap = require('react-bootstrap'),
    Button = ReactBootstrap.Button,
    Table = ReactBootstrap.Table,
    ButtonToolbar = ReactBootstrap.ButtonToolbar,
    ButtonGroup = ReactBootstrap.ButtonGroup;

var AppActions = require('../../actions/app-actions');
var RethinkApiUtils = require('../../utils/app-rethinkDataApiUtils');
var LoginStore = require('../../stores/LoginStore');

function getFilteredAndSortedChapters( chapters, fromDate, toDate ) {
    var _chapters = _.sortBy( _.filter( chapters, function( ch ) {
       return ch.lastActive > fromDate && ch.lastActive < toDate;
    }), 'lastActive');
    return _chapters;
};

var ChapterSelection = React.createClass({
  chapterSelectionHandler: function( event ) {
    AppActions.selectChapter( event.target.id );
    RethinkApiUtils.loadCourseProgress(  event.target.id, LoginStore.getCurrentClass() );
  },

  render: function() {
    console.log( show );

    var users = _.map(this.props.users, 'id');
    var chapterMapping = this.props.chapterMapping;
    var now = new Date();
    var lastWeek = new Date();
    var twoWeeksAgo = new Date();
    lastWeek.setDate( now.getDate() - 7 );
    twoWeeksAgo.setDate( now.getDate() - 14 );

    var ChaptersAccessedLastWeek = _.map( getFilteredAndSortedChapters( this.props.chapters, lastWeek, now ), function ( chapter , i ) {
  		if ( chapterMapping[chapter.id] ) {
        var label=chapterMapping[chapter.id].name + " (" + chapterMapping[chapter.id].grade + ")";
  			return (
            <Button id={chapter.id} onClick={this.chapterSelectionHandler}>{label}</Button>
  				);
  		}
  	}, this);

    var ChaptersAccessedTwoWeeksAgo = _.map( getFilteredAndSortedChapters( this.props.chapters, twoWeeksAgo, lastWeek), function ( chapter , i ) {
      if ( chapterMapping[chapter.id] ) {
        var label=chapterMapping[chapter.id].name + " (" + chapterMapping[chapter.id].grade + ")";
        return (
            <Button id={chapter.id} onClick={this.chapterSelectionHandler}>{label}</Button>
          );
      }
    }, this);

    var ChaptersOlderThanThat = _.map( getFilteredAndSortedChapters( this.props.chapters, 0, twoWeeksAgo ), function ( chapter , i ) {
      if ( chapterMapping[chapter.id] ) {
        var label=chapterMapping[chapter.id].name + " (" + chapterMapping[chapter.id].grade + ")";
        return (
            <Button id={chapter.id} onClick={this.chapterSelectionHandler}>{label}</Button>
          );
      }
    }, this);
    
    var style = {width:"33%", height:"100px"};
  	return (
        <Table striped bordered>
          <thead>
            <tr>
              <td>Worked on in the Last Week</td>
              <td>Worked on two Weeks Ago</td>
              <td>Worked on Previously</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={style}>
                <ButtonGroup vertical style={{height:"100px" , overflowY:"scroll"}}>
                  {ChaptersAccessedTwoWeeksAgo}
                </ButtonGroup>
              </td>
              <td style={style}>
                <ButtonGroup vertical style={{height:"100px" , overflowY:"scroll"}}>
                  {ChaptersAccessedTwoWeeksAgo}
                </ButtonGroup>
              </td>
              <td style={style}>
                <ButtonGroup vertical style={{height:"100px" , overflowY:"scroll"}}>
                  {ChaptersOlderThanThat}
                </ButtonGroup></td>
            </tr>
          </tbody>
        </Table>
  	);
  }
});

module.exports = ChapterSelection;