var React = require('react');
var AppStore = require('../../stores/app-store');
var ApiActionCreators = require('../../actions/ApiActionCreators');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var AnalyticsApiUtils = require('../../utils/app-analyticsApiUtils');
var RethinkApiUtils = require('../../utils/app-rethinkDataApiUtils');
var LoadingBar = require('./../loadingBar/loadingBar');
var DayPicker = require('./dateRangePicker');
var ReactBootstrap = require('react-bootstrap'),
    Panel = ReactBootstrap.Panel,
    Table = ReactBootstrap.Table;
var SessionBarChart = require('./myBarChart');
var SessionTable = require('./sessionDisplayTable');

var SessionDashboard = React.createClass({
  getInitialState: function() {
    var users = AppStore.getUsers();
    var chapterMapping = AppStore.getChapterInformation();
    var sessions = AppStore.getSessions();
    if( users.length < 1 || chapterMapping.length < 1 || sessions.length < 1 ) {
      return ({
        users:users,
        chapterMapping:chapterMapping,
        sessions: sessions,
        loading:true
      });
    }
    return ({
        users:users,
        chapterMapping:chapterMapping,
        sessions: sessions,
        loading:false
    });
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
    var users = AppStore.getUsers();
    var chapterMapping = AppStore.getChapterInformation();
    var sessions = AppStore.getSessions();
    //set state and set local storage cache
    if( users.length > 0 && chapterMapping.length > 0  && sessions.length > 0) {
      this.setState( { users:users, chapterMapping:chapterMapping, sessions:sessions, loading:false });
    };
  },

  render:function() {
    if ( this.state.loading ){
      return (<LoadingBar />
      );
    }
    var today = new Date();
    today.setHours(0,0,0,0);
    var oneWeekAgo = new Date(today.getTime() - (60*60*24*7*1000));
    return (
      <div>
        <div>
          <Table>
            <thead>
              <tr>
                <td>Select Date From:</td>
                <td>Select Date To:</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><DayPicker id="pickFromDateTime" width="400px"/></td>
                <td><DayPicker id="pickToDateTime" width="400px"/></td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Panel header="Chart Showing the Total Time Spent Working on Rethink Education">
          <SessionBarChart sessions={this.state.sessions} startDate={oneWeekAgo} endDate={today}/>
        </Panel>
        <Panel header="Work Completed per Student">
          <SessionTable sessions={this.state.sessions} />
        </Panel>
      </div>
    )
  }
});

module.exports = SessionDashboard