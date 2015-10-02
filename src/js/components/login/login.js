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
    var teacher = LoginStore.getTeacher();
    var teacher = LoginStore.getTeacher();
    if( teacher != null )
      loggedInUser = true;
    return (
        {
          teacher:teacher,
          loggedInUser: loggedInUser,
          emailAddress:'',
          password:''
        }
    );
  },

  login: function() {
    AuthService.login( this.state.emailAddress, this.state.password );
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
        <div>
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
      RouterContainer.get().transitionTo('/');
      return ( null );
    }
  }
})

module.exports = Login;
