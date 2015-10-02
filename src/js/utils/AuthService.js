var reqwest = require('reqwest');
var when = require('when');
var LoginConstants = require('../constants/LoginConstants');
var LoginActions = require('../actions/LoginAction');
var NProgress = require('nprogress-npm');
var request = require('superagent');
var Router = require('react-router');
var RouterContainer = require('./RouterContainer');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var AuthService = {

  loadTeacherInformation: function( id, jwt ) {
    NProgress.start();
    request
    .get( 'http://localhost:8080/teacher/' + id )
    .set("x-auth-token", jwt)
    .end(function(error, response){
      if (error){
        LoginActions.logoutUser();
        NProgress.done();
      }else{
        var teacher = JSON.parse(response.text);
        LoginActions.loadTeacher( teacher );
        NProgress.done();
      }
    })
  },

  login: function( username, password ) {
    NProgress.start();
    request
    .post( LoginConstants.LOGIN_URL )
    .send({ username:username, password:password})
    .set('accept', 'application/json')
    .end(function(error, response){
      if (error){
        localStorage.removeItem('jwt');
        RouterContainer.get().transitionTo('/');
        NProgress.done();
      }else{
        var jwt = response.header["x-auth-token"];
        var teacher = JSON.parse(response.text);
        LoginActions.loginUser( jwt , teacher);
        NProgress.done();
      }
    })
  },

  logout: function() {
    LoginActions.logoutUser();
    NProgress.start();
    request
    .get("http://localhost:8080"+"/logout" )
    .end(function(error, response){
      if (error){
        console.log("Server error, please try again later");
        NProgress.done();
      }else{
        console.log("Logged out");
        NProgress.done();
      }
    })
  },

  signup: function(username, password, extra) {
    return this.handleAuth(when(reqwest({
      url: LoginConstants.SIGNUP_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        username, password, extra
      }
    })));
  },
}

module.exports = AuthService;