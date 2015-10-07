var keyMirror = require('keymirror');
var BASE_URL = "http://localhost:8080/";
//var BASE_URL = 'http://rethink-data.herokuapp.com/';

module.exports = {
  BASE_URL : BASE_URL,

  UserActions: keyMirror({
    SELECT_CHAPTER: null,
    MARK_RESPONSE: null,
    LOAD_MARKED_RESPONSES: null,
    SELECT_USER: null,
    SELECT_ALL_USERS: null,
    DESELECT_ALL_USERS: null,
    DESELECT_USER: null
  }),

  ServerActions: keyMirror({
  	LOAD_SESSION_DATA: null,
    LOAD_CHAPTERS_DATA: null,
    LOAD_CHAPTER: null,
    LOAD_COURSE_PROGRESS: null,
    LOAD_USERS_DATA: null
  }),

  LoginConstants: keyMirror({
    SIGNUP_URL: BASE_URL + 'users',
    LOGIN_USER: 'LOGIN_USER',
    LOAD_TEACHER: 'LOAD_TEACHER',
    LOGOUT_USER: 'LOGOUT_USER',
    SELECT_CLASS:'SELECT_CLASS',
    DESELECT_CLASS:'DESELECT_CLASS',
  }),

  ApiConstants: keyMirror({
     BASE_URL: BASE_URL,
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
