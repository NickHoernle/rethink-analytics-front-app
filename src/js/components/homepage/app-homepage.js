var React = require('react');
var AppStore = require('../../stores/app-store.js');
var ReactBootstrap = require('react-bootstrap'),
  Jumbotron = ReactBootstrap.Jumbotron,
  Button = ReactBootstrap.Button;

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