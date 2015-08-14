var React = require('react');
var AppStore = require('../../stores/app-store.js');
var ApiActionCreators = require('../../actions/ApiActionCreators');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var AnalyticsApiUtils = require('../../utils/app-analyticsApiUtils');
var ReactBootstrap = require('react-bootstrap'),
  Jumbotron = ReactBootstrap.Jumbotron,
  Button = ReactBootstrap.Button,
  Table = ReactBootstrap.Table;


function getAppStateFromStores(){
  return {
    sessions: AppStore.getSessions()
  }
}

var SessionDashboard = React.createClass({

  getInitialState: function() {
    return getAppStateFromStores()
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    var userId = ["teach01","teach02","teach03"];
    var fromDateTime = 1217234618;
    AnalyticsApiUtils.loadSessions(userId,fromDateTime);
  },

  componentWillUnmount: function() {
      //AppStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
      this.setState( getAppStateFromStores() );
  },

  render:function(){
    var usersessions = this.state.sessions.map(function(session, i){
          return (
          <tr key={i}>
            <td>{session.id}</td>
            <td>{session.userId}</td>
            <td>{session.courseId}</td>
            <td>{session.endDateTime-session.startDateTime}</td>
          </tr>
        )
    } )
    return (
      <div className="row">
        <Jumbotron>
          <h1>SESSIONDASHBOARD!</h1>
          <p>This is the administration session dashboard</p>
          <p><Button bsStyle='primary'>Learn more</Button></p>
        </Jumbotron>
        <Table responsive>
            <thead>
              <tr>
                <th>Session id</th>
                <th>Session User</th>
                <th>Session Course</th>
                <th>Session Duration</th>
              </tr>
            </thead>
            <tbody>
              {usersessions
              }
             </tbody>
          </Table>
      </div>
    )
  }
});

module.exports = SessionDashboard