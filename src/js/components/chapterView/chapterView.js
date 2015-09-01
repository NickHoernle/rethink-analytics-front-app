var React = require('react');
var AppStore = require('../../stores/app-store');
var ApiActionCreators = require('../../actions/ApiActionCreators');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var RethinkApiUtils = require('../../utils/app-rethinkDataApiUtils');
var AnalyticsApiUtils = require('../../utils/app-analyticsApiUtils');
var LoadingBar = require('./../loadingBar/loadingBar');
var ChapterSelection = require('./chaptersSelection');
var ClassListSelection = require('./classListSelection');
var DisplayChapter = require('./displayChapter');
var ReactBootstrap = require('react-bootstrap'),
    DropdownButton = ReactBootstrap.DropdownButton,
    MenuItem = ReactBootstrap.MenuItem;

function getAppStateFromStores(){
  var users = AppStore.getUsers();
  var chapterMapping = AppStore.getChapterInformation();
  var sessions = AppStore.getSessions();
  var chapters = AppStore.getChapters();
  var selectedChapter = AppStore.getSelectedChapter();
  var courseProgress = AppStore.getCourseProgress();
  if( users.length < 1 || chapterMapping.length < 1 || sessions.length < 1 ) {
    return ({
      selectedChapter:selectedChapter,
      users:users,
      courseProgress:courseProgress,
      chapters:chapters,
      chapterMapping:chapterMapping,
      sessions: sessions,
      loading:true
    });
  }
  return ({
      selectedChapter:selectedChapter,
      users:users,
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

  componentWillMount: function() {
    var userIds = ["teach01","teach02","teach03","teach04","teach10","teach11"];
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
  },

  render:function() {
    var selectedChapter = null;
    if( this.state.selectedChapter ){
      selectedChapter = this.state.selectedChapter.name;
    };
    if ( this.state.loading ){
      return (<LoadingBar />
      );
    }
    return (
      <div>
        <ClassListSelection users={this.state.users} selectedChapter={this.state.selectedChapter} />
        <ChapterSelection chapters={this.state.chapters} chapterMapping={this.state.chapterMapping} selectedChapter={selectedChapter} users={this.state.users} />
        <DisplayChapter courseProgress={this.state.courseProgress} users={this.state.users} selectedChapter={this.state.selectedChapter} sessions={this.state.sessions} />
      </div>
    );
  }
});

module.exports = ChapterView;