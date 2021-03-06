var React = require('react');
var reactMixin = require('react-mixin');
var Auth = require('../../utils/AuthService');
var LoginStore = require('../../stores/LoginStore');
var ReactBootstrap = require('react-bootstrap'),
  ButtonToolbar = ReactBootstrap.ButtonToolbar,
  Navbar = ReactBootstrap.Navbar,
  Nav = ReactBootstrap.Nav,
  NavItem = ReactBootstrap.NavItem,
  DropdownButton = ReactBootstrap.DropdownButton,
  MenuItem = ReactBootstrap.MenuItem,
  TabbedArea = ReactBootstrap.TabbedArea,
  TabPane = ReactBootstrap.TabPane,
  Panel = ReactBootstrap.Panel,
  Glyphicon = ReactBootstrap.Glyphicon,
  Button = ReactBootstrap.Button,
  Row = ReactBootstrap.Row,
  Col = ReactBootstrap.Col,
  ButtonInput = ReactBootstrap.ButtonInput,
  Input = ReactBootstrap.Input;
var AuthService = require('./../../utils/AuthService');
var RouterContainer = require('./../../utils/RouterContainer');

var Login = React.createClass({
  getInitialState: function() {
    var loggedInUser = false;
    var requestAddress = LoginStore.getInitialRequestAddress();
    if( LoginStore.getTeacher() != null ){
      loggedInUser = true;
    }
    return (
        {
          loggedInUser: loggedInUser,
          emailAddress:'',
          password:'',
          requestAddress:requestAddress
        }
    );
  },

  login: function() {
    AuthService.login( this.state.emailAddress, this.state.password );
  },

  componentDidMount: function() {
    LoginStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    if ( LoginStore.getTeacher() != null ){
      this.setState( { loggedInUser: true } );
    }
  },

  keyPress: function( event ) {
    if( event.which == 13 ) {
      AuthService.login( this.state.emailAddress, this.state.password );
    }
  },

  handleChange: function( event ) {
    switch ( event.target.id ) {
      case "emailAddress":
        this.setState({emailAddress:event.target.value});
        break;
      case "password":
        this.setState({password:event.target.value});
        break;
    }
  },

  render:function(){
    if (!this.state.loggedInUser) {
      return (
        <div onKeyPress={this.keyPress}>
          <center>
            <img id="Image-Rethink" src="http://res.cloudinary.com/he6wnpmm5/image/upload/v1435582819/sponsors/rethinkeducation.png" height="83px" width="256px"></img>
            <p><br/></p>
          </center>
          <Input help="Forgotten your password?" wrapperClassName="wrapper">
            <Row>
              <Col xs={4}>
                <Input label="Email Address" type="text" className="form-control" placeholder="Email Address" id="emailAddress" onChange={this.handleChange} />
              </Col>
              <Col xs={4}>
                <Input label="Password" type="password" className="form-control" placeholder="Password" id="password" onChange={this.handleChange} />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Input type="checkbox" label="Keep me logged in" />
              </Col>
              <Col xs={4}>
                <ButtonInput type="submit" value="Log In"  onClick={this.login} />
              </Col>
            </Row>
          </Input>
          <div id="hr-Rethink"><hr/></div> 
        </div>
      )
    }
    else {
      if ( LoginStore.getTeacher().classes == null ){
        RouterContainer.get().transitionTo("/create-class");
      }
      if ( this.state.requestAddress == "/login" || !this.state.requestAddress ){
        RouterContainer.get().transitionTo("/home");
      } else {
        RouterContainer.get().transitionTo(this.state.requestAddress);
      }
      return ( null );
    }
  }
})

module.exports = Login;
