var React = require('react');
var AppStore = require('../../stores/app-store.js');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var ReactBootstrap = require('react-bootstrap'),
  Button = ReactBootstrap.Button,
  Table = ReactBootstrap.Table;

function userIDs(){
  return {users: AppStore.getUsers()}
}

var ClassList = React.createClass({
  render:function(){
    return (
      <div className="row">
        <h1>Class List</h1>
        <ClassListTable />
      </div>
    )
  }
});

var ClassListTable = React.createClass({
  mixins:[StoreWatchMixin(userIDs)],
  render:function(){
	var users = this.state.users.map(function(user, i){
      return (
          <tr key={i}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
          </tr>
      );
    })
	return (
        <div>
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
            	{users
            	}
             </tbody>
          </Table>
        </div>
      )
  }
});

module.exports = ClassList