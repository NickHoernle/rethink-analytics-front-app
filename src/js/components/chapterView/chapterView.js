var React = require('react');
var AppStore = require('../../stores/app-store');
var ApiActionCreators = require('../../actions/ApiActionCreators');
var AppActions = require('../../actions/app-actions');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var RethinkApiUtils = require('../../utils/app-rethinkDataApiUtils');
var AnalyticsApiUtils = require('../../utils/app-analyticsApiUtils');
var LoadingBar = require('./../loadingBar/loadingBar');
var ChapterSelection = require('./chaptersSelection');
var ClassListSelection = require('./classListSelection');
var DisplayChapter = require('./displayChapter');
var LoginStore = require('./../../stores/LoginStore');

var _ = require('lodash');
var ReactBootstrap = require('react-bootstrap'),
    PanelGroup = ReactBootstrap.PanelGroup,
    Panel = ReactBootstrap.Panel,
    Tabs = ReactBootstrap.Tabs,
    DropdownButton = ReactBootstrap.DropdownButton,
    MenuItem = ReactBootstrap.MenuItem;

function getAppStateFromStores(){
  var users = AppStore.getUsers();
  var chapterMapping = AppStore.getChapterInformation();
  var sessions = AppStore.getSessions();
  var teacher = LoginStore.getTeacher();
  var chapters = AppStore.getChapters();
  var selectedChapter = AppStore.getSelectedChapter();
  var courseProgress = AppStore.getCourseProgress();
  if( users.length < 1 || chapterMapping.length < 1 || sessions.length < 1 ) {
    return ({
      selectedChapter:selectedChapter,
      users:users,
      teacher:teacher,
      courseProgress:courseProgress,
      chapters:chapters,
      chapterMapping:chapterMapping,
      sessions: sessions,
      loading:true,
      activeKey:'1'
    });
  }
  return ({
      selectedChapter:selectedChapter,
      users:users,
      teacher:teacher,
      chapters:chapters,
      courseProgress:courseProgress,
      chapterMapping:chapterMapping,
      sessions: sessions,
      loading:false
  });
}

var ChapterView = React.createClass({
  getInitialState: function() {
      return ( getAppStateFromStores() );
  },

  handleSelect: function(activeKey) {
    this.setState({ activeKey });
  },

  componentWillMount: function() {
    console.log( "teacher", this.state.teacher );
    var userIds = this.state.teacher.usersInClass;
    var today = new Date();
    today.setDate( today.getDate() - 7 );
    var fromDateTime = today.getMilliseconds();
    if ( this.state.users.length < 1 ) {
      AnalyticsApiUtils.loadUsers( userIds );
    }
    if ( this.state.chapterMapping.length < 1 ) {
      RethinkApiUtils.loadChapterInformation();
    }
    if ( this.state.sessions.length < 1 ) {
      AnalyticsApiUtils.loadSessions(userIds,fromDateTime);
    }
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState( getAppStateFromStores() );
    if ( this.state.selectedChapter != null && this.state.activeKey == 1 ) {
      this.setState({ activeKey:'2' });
    }
  },

  render:function() {
    var selectedChapter = null;
    if( this.state.selectedChapter ){
      selectedChapterHeading = "Chapter: " + this.state.selectedChapter.name + " selected, click here to select new chapter";
    } else {
      selectedChapterHeading = "Step1, Select a Chapter: "
    };
    if ( this.state.loading ){
      return (<LoadingBar />
      );
    }
    return (
      <PanelGroup activeKey={this.state.activeKey} defaultActiveKey='1' onSelect={this.handleSelect} accordion>
        <Panel header={selectedChapterHeading} eventKey='1' bsStyle='primary'>
          <ChapterSelection chapters={this.state.chapters} chapterMapping={this.state.chapterMapping} selectedChapter={selectedChapter} users={this.state.users} />          
        </Panel>
        <Panel header='Step2, Select the Available Users to View Coursework:' eventKey='2' bsStyle='primary'>
          {<ClassListSelection users={this.state.users} selectedChapter={this.state.selectedChapter} />}
        </Panel>
        <Panel header='Step3, View Coursework:' eventKey='2' bsStyle='primary'>
          {<DisplayChapter courseProgress={this.state.courseProgress} users={this.state.users} selectedChapter={this.state.selectedChapter} sessions={this.state.sessions} />}
        </Panel>
      </PanelGroup>
    );
  }
});

module.exports = ChapterView;