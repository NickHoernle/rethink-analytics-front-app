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
    console.log("PROPS");
    console.log(this.props);
    return (
      <div>
        <Header {...this.props}/>
        <RouteHandler {...this.props}/>
      </div>
    )
  }
});

var routes = (
  <Route handler={App}>
  	<Route path="teacherId/:teacherId" handler={HomePage} />
    <Route path="teacherId/:teacherId/sessionsdashboard" handler={SessionDashboard} />
    <Route path="teacherId/:teacherId/classlist" handler={classList} />
    <Route path="teacherId/:teacherId/chapterview" handler={ChapterView} />
  </Route>
);


Router.run(routes, function (Handler, state) {  
  React.render(<Handler {...state}/>, document.body);
});