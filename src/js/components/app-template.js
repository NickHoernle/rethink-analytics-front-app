var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;


var Header = require('./header/app-header');
var LoginStore = require('./../stores/LoginStore');
var AuthService = require('../utils/AuthService');
var Login = require('./login/login');
var RouterContainer = require('./../utils/RouterContainer');
var ClassSelection = require('./../components/classSelection/classSelection');
var AppStore = require('./../stores/app-store');
var LoadingBar = require('./loadingBar/loadingBar');

var Template = React.createClass({
  getInitialState: function(){
    LoginStore.setInitialRequestAddress( this.props.path );
    if ( LoginStore.getTeacher() == null ) {
      return ({
        loggedIn:false
      });
    }
    return ({
        loggedIn:true,
        showClassSelection:showClassSelection
    });
  },

  componentWillMount: function() {
    LoginStore.addChangeListener(this._onChange);
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var loggedIn = false;
    if ( LoginStore.getTeacher() != null ) {
      loggedIn = true;
    }

    this.setState( {loggedIn: loggedIn} );

    var showClassSelection = true;
    if ( LoginStore.getCurrentClass() ) { showClassSelection = false; }
    this.setState( {showClassSelection: showClassSelection} );

  },

  render: function(){
    if ( this.state.loggedIn == false ) {
      RouterContainer.get().transitionTo('/login');
    }
    return(
        <div className="container">
          <Header {...this.props}/>
          <RouteHandler {...this.props}/>
          <ClassSelection showClassSelection={this.state.showClassSelection} />
        </div>
      );
    }
});

module.exports = Template;
