var React = require('react');
var _ = require('lodash');
var ReactBootstrap = require('react-bootstrap'),
  Button = ReactBootstrap.Button,
  Table = ReactBootstrap.Table,
  Panel = ReactBootstrap.Panel;


var AppStore = require('../../stores/app-store.js');
var RethinkApiUtils = require('../../utils/app-rethinkDataApiUtils');
var RecentChaptersDisplay = require('./recentlyWorkedOnTopics.js');
var LoadingBar = require('./../loadingBar/loadingBar');
var LoginStore = require('./../../stores/LoginStore');


var ClassList = React.createClass({
  getInitialState: function() {
    var users = AppStore.getUsers();
    var chapterMapping = AppStore.getChapterInformation();
    var teacher = LoginStore.getTeacher();
    if( users.length < 1 || chapterMapping.length < 1 ) {
      return ({
        users:users,
        teacher:teacher,
        chapterMapping:chapterMapping,
        loading:true
      });
    }
    return ({
        users:users,
        teacher:teacher,
        chapterMapping:chapterMapping,
        loading:false
    });
  },

  componentWillMount: function() {
    if( this.state.teacher != null ) {
      if (  this.state.users.length < 1 ) {
        RethinkApiUtils.loadUsersInClass( LoginStore.getCurrentClass() );
      }
      if ( this.state.chapterMapping.length < 1 ) {
        RethinkApiUtils.loadChapterInformation();
      }
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
    if( users.length > 0 && chapterMapping.length > 0 ) {
      this.setState( { users:users, chapterMapping:chapterMapping, loading:false });
    }
  },

  render:function(){
  if ( this.state.loading ){
    return (<LoadingBar />
    );
  }
  var style1 = {verticalAlign:"middle", fontSize:"16px"};
  var mapping = this.state.chapterMapping;
	var users_ = _.sortByOrder(this.state.users, 'lastActive', 'desc' ).map(function( user, i ){
    lastActive = new Date( user.lastActive );
    return (
          <tr key={i} >
            <td style={style1}>{i}</td>
            <td style={style1}>{user.firstname}</td>
            <td style={style1}>{user.lastname}</td>
            <td style={style1}>{lastActive.getDate() + "/" + lastActive.getMonth() + "/" + lastActive.getFullYear() }</td>
            <td style={{maxWidth:"400px", overflowX:"scroll"}} className="chapterDisplay">
                <RecentChaptersDisplay chapterMapping={mapping} userChapters={user.chaptersWorkedOn} />     
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