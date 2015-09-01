var React = require('react');
var AppStore = require('../../stores/app-store.js');
var RethinkApiUtils = require('../../utils/app-rethinkDataApiUtils');
var AnalyticsApiUtils = require('../../utils/app-analyticsApiUtils');
var ReactBootstrap = require('react-bootstrap'),
  Jumbotron = ReactBootstrap.Jumbotron,
  Button = ReactBootstrap.Button;

var getAppStateFromStores = function(){
  var userIds = ["teach01","teach02","teach03","teach04","teach10","teach11"];
  var today = new Date();
  today.setDate( today.getDate() - 7 );
  var fromDateTime = today.getMilliseconds();
  AnalyticsApiUtils.loadUsers( userIds );
  AnalyticsApiUtils.loadSessions( userIds,fromDateTime );
  RethinkApiUtils.loadChapterInformation();
  return { 
    null:null
  };
};

var HomePage = React.createClass({
  render:function(){
    return (
      <div className="row">
        <Jumbotron>
          <h1>Hello, Rethinkers!</h1>
          <p>This is the administration home page.</p>
          <p>From this page you will eventually be able to manage your classes.
          Set homework tasks for your students, monitor those students and get very easy reporting
          back on the progress of your students.</p>
          <p>You'll also be able to manage your class lists and add and invide new users.</p>
        </Jumbotron>
      </div>
    )
  }
});

module.exports = HomePage