//var BASE_URL = 'http://localhost:8080/';
var BASE_URL = 'http://rethink-data.herokuapp.com/';

module.exports = {
  BASE_URL: BASE_URL,
  LOGIN_URL: BASE_URL + 'sessions/create',
  SIGNUP_URL: BASE_URL + 'users',
  LOGIN_USER: 'LOGIN_USER',
  LOAD_TEACHER: 'LOAD_TEACHER',
  LOGOUT_USER: 'LOGOUT_USER'
};