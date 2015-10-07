var React = require('react');
var _ = require('lodash');
var ReactBootstrap = require('react-bootstrap'),
    PanelGroup = ReactBootstrap.PanelGroup,
    Panel = ReactBootstrap.Panel,
    Tabs = ReactBootstrap.Tabs,
    DropdownButton = ReactBootstrap.DropdownButton,
    Button = ReactBootstrap.Button,
    MenuItem = ReactBootstrap.MenuItem;

var AppStore = require('../../stores/app-store');
var LoginStore = require('../../stores/LoginStore');
var ApiActionCreators = require('../../actions/ApiActionCreators');
var AppActions = require('../../actions/app-actions');
var RethinkApiUtils = require('../../utils/app-rethinkDataApiUtils');
var LoadingBar = require('./../loadingBar/loadingBar');
var ChapterSelection = require('./chaptersSelection');
var ClassListSelection = require('./classListSelection');
var DisplayChapter = require('./DisplayChapter');
var LoginStore = require('./../../stores/LoginStore');

function getAppStateFromStores(){
  var users = AppStore.getUsers();
  var chapterMapping = AppStore.getChapterInformation();
  var chapters = AppStore.getChaptersDoneByUsers();
  var selectedChapter = AppStore.getSelectedChapter();
  var courseProgress = AppStore.getCourseProgress();
  var loading = false;
  var showChapterSelection = true;
  if( users.length < 1 || chapterMapping.length < 1 ) {
    loading = true;
  }
  if ( selectedChapter != null ) {
    showChapterSelection = false;
  }
  return ({
      selectedChapter:selectedChapter,
      users:users,
      chapters:chapters,
      courseProgress:courseProgress,
      chapterMapping:chapterMapping,
      showChapterSelection:showChapterSelection,
      loading:false
  });
}

function loadAppInformation ( users, chapterMapping ) {
  if ( LoginStore.getTeacher() != null && LoginStore.getCurrentClass() != null) {
    if ( users.length < 1 ) {
      RethinkApiUtils.loadUsersInClass( LoginStore.getCurrentClass() );
    }
  }
  if ( chapterMapping.length < 1 ) {
      RethinkApiUtils.loadChapterInformation();
  }
}

var ChapterView = React.createClass({
  getInitialState: function() {
      return ( getAppStateFromStores() );
  },

  componentWillMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentDidMount: function() {
    loadAppInformation( this.state.users, this.state.chapterMapping );
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState( getAppStateFromStores() );
    
    if ( this.state.selectedChapter != null && this.state.activeKey1 == "1" ) {
      this.setState({activeKey1:'2', activeKey2:'0'});
    } else if ( this.state.selectedChapter != null && this.state.activeKey1 == "2" ) {
      if ( _.find( this.state.users , {"selected":true} ) != null ) {
        this.setState({activeKey2:'3'});
      }
    }
    loadAppInformation( this.state.users, this.state.chapterMapping );
  },

  viewChapterSelectionHandler: function( event ){
    this.setState({showChapterSelection:true})
  },

  render:function() {
    var selectedChapter = null;
    var displayChapter = false;
    if ( this.state.loading ){
      return (<LoadingBar />
      );
    }
    var headingStyle={fontSize:"24px", paddingLeft:"1cm"};
      return (
        <div>
              <h1 style={headingStyle}>{this.state.selectedChapter != null ? "Chapter: " + this.state.selectedChapter.name : "Select a Chapter"}</h1>
              { 
                this.state.showChapterSelection == true ? 
                <ChapterSelection chapters={this.state.chapters} chapterMapping={this.state.chapterMapping} selectedChapter={selectedChapter} users={this.state.users} />
              :
                <p style={{paddingLeft:"1cm"}}><Button bsStyle="link" onClick={this.viewChapterSelectionHandler}><i>select different chapter</i></Button></p>
              }
            <hr/>
            <h1 style={headingStyle}>Select the Students</h1>
              {<ClassListSelection users={this.state.users} selectedChapter={this.state.selectedChapter} />}
              <hr/>
            {<DisplayChapter courseProgress={this.state.courseProgress} users={this.state.users} selectedChapter={this.state.selectedChapter} />}
        </div>
      );
  }
});

module.exports = ChapterView;