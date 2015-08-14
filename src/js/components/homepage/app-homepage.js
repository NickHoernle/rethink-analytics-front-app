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
          <p>This is the administration home page</p>
          <p><Button bsStyle='primary'>Learn more</Button></p>
        </Jumbotron>
      </div>
    )
  }
});

module.exports = HomePage