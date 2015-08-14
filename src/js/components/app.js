var React = require('react');
var Router = require('react-router-component');
var HomePage = require('./homepage/app-homepage');
var classList = require('./classlist/app-classlist');
var Template = require('./app-template.js');
var SessionDashboard = require('./sessionsdashboard/app-sessionsdashboard');
var Locations = Router.Locations;
var Location  = Router.Location;


var App = React.createClass({
  render:function(){
    return (
      <Template>
        <Locations>
          <Location path="/" handler={HomePage} />
          <Location path="/sessionDashboard" handler={SessionDashboard} />
          <Location path="/classList" handler={classList} />
        </Locations>
      </Template>
    );
  }
});

module.exports = App;
