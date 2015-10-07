var reqwest = require('reqwest');
var when = require('when');
var AppConstants = require('../constants/app-constants');
var LoginActions = require('../actions/LoginAction');
var NProgress = require('nprogress-npm');
var request = require('superagent');
var Router = require('react-router');
var RouterContainer = require('./RouterContainer');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var API_URL = AppConstants.BASE_URL;

var AuthService = {

  loadTeacherInformation: function( id, jwt ) {
    NProgress.start();
    request
    .get( API_URL + '/teacher/' + id )
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
    .post( API_URL + "sessions/create" )
    .set('accept', 'application/json')
    .send({ username:username, password:password})
    .end(function(error, response){
      if (error){
        localStorage.removeItem('jwt');
        RouterContainer.get().transitionTo('#/login');
        console.log("error", error);
        alert(error);
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
    .get(API_URL +"/logout" )
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
      url: AppConstants.LoginConstants.SIGNUP_URL,
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