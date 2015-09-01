var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;	
var HomePage = require('./components/homepage/app-homepage');
var classList = require('./components/classlist/app-classlist');
var ChapterView = require('./components/chapterView/chapterView');
var Template = require('./components/app-template.js');
var SessionDashboard = require('./components/sessionsdashboard/app-sessionsdashboard');
var Header = require('./components/header/app-header');

var App = React.createClass({
  render () {
    return (
      <div>
        <Header />
        <RouteHandler/>
      </div>
    )
  }
});

var routes = (
  <Route handler={App}>
  	<Route path="/" handler={HomePage} />
    <Route path="sessionsdashboard" handler={SessionDashboard} />
    <Route path="classlist" handler={classList} />
    <Route path="chapterview" handler={ChapterView} />
  </Route>
);


Router.run(routes, function (Handler) {  
  React.render(<Handler/>, document.body);
});