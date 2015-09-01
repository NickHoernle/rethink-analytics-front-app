var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
  Jumbotron = ReactBootstrap.Jumbotron,
  Button = ReactBootstrap.Button,
  Table = ReactBootstrap.Table;

var SessionTable = React.createClass({
    render: function() {
    /*var usersessions = this.props.sessions.map(function(session, i){
          return (
          <tr key={i}>
            <td>{session.id}</td>
            <td>{session.userId}</td>
            <td>{session.courseId}</td>
            <td>{session.endDateTime-session.startDateTime}</td>
          </tr>
        )
    } );*/
    return (
          <Table>
            <thead>
              <tr>
                <td>
                  Date
                </td>
                <td>
                  Student
                </td>
                <td>
                  Chapters Worked On
                </td>
                <td>
                  Time Spent on Chapter
                </td>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </Table>
        );
    }
});

module.exports = SessionTable;