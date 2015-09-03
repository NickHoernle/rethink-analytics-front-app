var React = require('react');
var AppStore = require('../../stores/app-store.js');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var RethinkApiUtils = require('../../utils/app-rethinkDataApiUtils');
var AnalyticsApiUtils = require('../../utils/app-analyticsApiUtils');
var RecentChaptersDisplay = require('./recentlyWorkedOnTopics.js');
var LoadingBar = require('./../loadingBar/loadingBar');
var ReactBootstrap = require('react-bootstrap'),
  Button = ReactBootstrap.Button,
  Table = ReactBootstrap.Table,
  Panel = ReactBootstrap.Panel;

var ClassList = React.createClass({
  getInitialState: function() {
    var users = AppStore.getUsers();
    var chapterMapping = AppStore.getChapterInformation();
    if( users.length < 1 || chapterMapping.length < 1 ) {
      return ({
        users:users,
        chapterMapping:chapterMapping,
        loading:true
      });
    }
    return ({
        users:users,
        chapterMapping:chapterMapping,
        loading:false
    });
  },

  componentWillMount: function() {
    if ( this.state.users.length<1 ) {
      var userIds = ["teach01","teach02","teach03","teach04","teach10","teach11"];
      AnalyticsApiUtils.loadUsers( userIds );
    }
    if ( this.state.chapterMapping.length<1 ) {
      RethinkApiUtils.loadChapterInformation();
    }
    AppStore.addChangeListener(this._onChange);
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var users = AppStore.getUsers();
    var chapterMapping = AppStore.getChapterInformation();
    //set state and set local storage cache
    if( users.length > 0 && chapterMapping.length > 0 ) {
      this.setState( { users:users, chapterMapping:chapterMapping, loading:false });
    };
  },

  render:function(){
  if ( this.state.loading ){
    return (<LoadingBar />
    );
  }
    var style1 = {verticalAlign:"middle", fontSize:"16px"};
    var mapping = this.state.chapterMapping;
  	var users_ = this.state.users.map(function( user, i ){
      return (
            <tr key={i}>
              <td style={style1}>{user.id}</td>
              <td style={style1}>{user.firstname}</td>
              <td style={style1}>{user.lastname}</td>
              <td style={style1}>{user.lastActive}</td>
              <td>
                <RecentChaptersDisplay chapterMapping={mapping} userChapters={user.chaptersCompleted} />          
               </td>
            </tr>
        );
      })
  	return (
          <div>
            <Panel heading="Class List">
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Last Active</th>
                    <th>Completed Topics</th>
                  </tr>
                </thead>
                <tbody>
                	{users_}
                 </tbody>
              </Table>
              </Panel>
          </div>
        )
    }
});

module.exports = ClassList