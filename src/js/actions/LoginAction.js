var AppDispatcher = require('../dispatchers/app-dispatcher');
var LoginConstants = require('../constants/LoginConstants');
var RouterContainer = require('../utils/RouterContainer');

var LoginActions =  {
  loginUser: function(jwt, teacher) {
    var savedJwt = localStorage.getItem('jwt');
    if (savedJwt != jwt) {
      localStorage.setItem('jwt', jwt);
    }
    var payload = {
      jwt:jwt,
      teacher:teacher
    };
    AppDispatcher.handleLoginAction({
      type: LoginConstants.LOGIN_USER,
      payload: payload
    });
  },

  logoutUser: function() {
    localStorage.removeItem('jwt');
    AppDispatcher.handleLoginAction({
      type: LoginConstants.LOGOUT_USER
    });
  },

  loadTeacher: function( response ){
    AppDispatcher.handleLoginAction({
      type: LoginConstants.LOAD_TEACHER,
      payload: response
    });
  }
}

module.exports = LoginActions;