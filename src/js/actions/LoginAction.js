var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
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
      type: AppConstants.LoginConstants.LOGIN_USER,
      payload: payload
    });
  },

  logoutUser: function() {
    window.localStorage.clear();
    localStorage.removeItem('jwt');
    localStorage.clear();
    RouterContainer.get().transitionTo("/login");
    AppDispatcher.handleLoginAction({
      type: AppConstants.LoginConstants.LOGOUT_USER
    });
  },

  loadTeacher: function( response ){
    AppDispatcher.handleLoginAction({
      type: AppConstants.LoginConstants.LOAD_TEACHER,
      payload: response
    });
  },
  
  selectClass: function( classId ) {
    AppDispatcher.handleLoginAction({
      type: AppConstants.LoginConstants.SELECT_CLASS,
      payload: classId
    });
  },

  deselectClass: function( ) {
    AppDispatcher.handleLoginAction({
      type: AppConstants.LoginConstants.DESELECT_CLASS
    });
  },
}

module.exports = LoginActions;