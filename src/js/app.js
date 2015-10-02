"use strict";

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;	
var RouterContainer = require('./utils/RouterContainer')
var AuthenticatedApp = require('./components/login/AuthenticatedApp');
var HomePage = require('./components/homepage/app-homepage');
var classList = require('./components/classlist/app-classlist');
var ChapterView = require('./components/chapterView/chapterView');
var Template = require('./components/app-template.js');
var SessionDashboard = require('./components/sessionsdashboard/app-sessionsdashboard');
var Header = require('./components/header/app-header');
var Login = require('./components/login/login');
var Signup = require('./components/login/signup');
var LoginStore = require('./stores/LoginStore');
var LoginActions = require('./actions/LoginAction');
var AuthService = require('./utils/AuthService');
var jwt_decode = require('jwt-decode');

var routes = (
  <Route handler={AuthenticatedApp}>
    <Route name="login" handler={Login}/>
    <Route name="signup" handler={Signup}/>
    <Route name="home" path="/" handler={HomePage}/>
    <Route path="/sessionsdashboard" handler={SessionDashboard} />
    <Route path="/classlist" handler={classList} />
    <Route path="/chapterview" handler={ChapterView} />
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

let jwt = localStorage.getItem('jwt');
if (jwt && !LoginStore.getTeacher() ) {
  AuthService.loadTeacherInformation( jwt_decode(jwt).sub , jwt );
}

Router.run(routes, function (Handler, state) {  
  React.render(<Handler {...state}/>, document.body);
});