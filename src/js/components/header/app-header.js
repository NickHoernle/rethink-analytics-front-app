var React = require('react');
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
  Button = ReactBootstrap.Button;
var Link = require('react-router').Link

var Header = React.createClass({
  render:function(){
    return (
        <div>
          <center>
            <img id="Image-Rethink" src="http://res.cloudinary.com/he6wnpmm5/image/upload/v1435582819/sponsors/rethinkeducation.png" height="83px" width="256px"></img>
            <p><br/></p>
          </center>
          <center>
            <ButtonToolbar>
              <Button bsStyle='link'>
                <Glyphicon glyph="home" />
                <a href={"#/teacherId/" + this.props.params.teacherId}> Home</a>
              </Button>
              <Button bsStyle='link'>
                <Glyphicon glyph="th-list" /> 
                <a href={"#/teacherId/" + this.props.params.teacherId + "/classlist"}> Class List</a>
              </Button>
              <Button bsStyle='link'>
                <Glyphicon glyph="dashboard" /> 
                <a href={"#/teacherId/" + this.props.params.teacherId + "/sessionsdashboard"}> Session View</a>
              </Button>
              <Button bsStyle='link'>
                <Glyphicon glyph="book" /> 
                <a href={"#/teacherId/" + this.props.params.teacherId + "/chapterview"}> Chapter View</a>
              </Button>
              <Button bsStyle='link'>
                <Glyphicon glyph="info-sign" /> 
                Other
              </Button>
            </ButtonToolbar>
            </center>
            <div id="hr-Rethink"><hr/></div> 
        </div>
    );
  }
});

module.exports = Header;