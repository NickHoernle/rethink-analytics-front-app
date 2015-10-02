var React = require('react');
var LoginStore = require('./../../stores/LoginStore');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Header = require('../header/app-header');
var Link = Router.Link;
var AuthService = require('../../utils/AuthService');
var reactMixin = require('react-mixin');
var Login = require('./login');
var RouterContainer = require('./../../utils/RouterContainer');

var AuthenticatedApp = React.createClass({
  getInitialState: function(){
    var teacher = LoginStore.getTeacher();
    return ( {teacher:teacher} );
  },

  componentWillMount: function() {

  },

  componentDidMount: function() {
    LoginStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var teacher = LoginStore.getTeacher();
    this.setState( {teacher:teacher} );
  },

  render: function(){
    if ( this.state.teacher ) {
      return(
        <div className="container">
          <Header {...this.props}/>
          <RouteHandler/>
        </div>
      );
    }
    RouterContainer.get().transitionTo('/login');
    return(
        <div className="container">
          <Login />
        </div>
      );
  }
});

module.exports = AuthenticatedApp;