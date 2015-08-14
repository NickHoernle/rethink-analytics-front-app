var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
  ButtonToolbar = ReactBootstrap.ButtonToolbar,
  Navbar = ReactBootstrap.Navbar,
  Nav = ReactBootstrap.Nav,
  NavItem = ReactBootstrap.NavItem,
  DropdownButton = ReactBootstrap.DropdownButton,
  MenuItem = ReactBootstrap.MenuItem,
  Button = ReactBootstrap.Button;
var Link = require('react-router-component').Link

var Header = React.createClass({
  render:function(){
    return (
        <div className="row">
          <div className="mainHeader">
            <NavbarInstance />
          </div>
       </div>
    );
  }
});

var NavbarInstance = React.createClass({
render: function() {
 return(
        <Navbar brand='Rethink Education Administration' inverse toggleNavKey={0}>
          <Nav right eventKey={0}> {/* This is the eventKey referenced */}
            <NavItem eventKey={1} > <Link href="/">home</Link> </NavItem>
            <NavItem eventKey={2} > <Link href="/help">help</Link> </NavItem>
            <DropdownButton eventKey={3} title='menu'>
              <MenuItem eventKey='1'> <Link href="/sessionDashboard">Session Dashboard</Link> </MenuItem>
              <MenuItem eventKey='2'> <Link href="/classList">Class List</Link> </MenuItem>
              <MenuItem eventKey='3'>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey='4'>Separated link</MenuItem>
            </DropdownButton>
            <NavItem divider />
            <NavItem divider />
            <NavItem eventKey={4} href='http://www.rethinkeducation.co.za'>
              <img id="Image-Rethink" src="http://res.cloudinary.com/he6wnpmm5/image/upload/v1435582819/sponsors/rethinkeducation.png" width="150px"></img>
            </NavItem>
          </Nav>
        </Navbar>
    );
}  
});

module.exports = Header;