var AppDispatcher = require('../dispatchers/app-dispatcher');
var _ = require('lodash');
var AppConstants = require('../constants/app-constants');
var jwt_decode = require('jwt-decode');

var assign = require('react/lib/Object.assign');
var RethinkApiUtils = require('./../utils/app-rethinkDataApiUtils');
var AuthService = require('./../utils/AuthService');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _teacherId = null;
var _jwt = null;
var _teacher = null;
var requestAddress = null;
var currentClass = null;
var availableClass = [];

function createAvailableClass( teacher ) {
  availableClass = teacher.classes;
  if ( availableClass.length == 1 ){
    currentClass = availableClass[0].id ;
  }
}

var LoginStore = assign(EventEmitter.prototype, {
  emitChange: function(){
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },

  getTeacherId: function(){
    return _teacherId;
  },

  getTeacher: function(){
    return _teacher;
  },

  getAvailableClasses: function() {
    return availableClass;
  },

  getJwt: function(){
    return _jwt;
  },

  getCurrentClass: function() {
    return currentClass;
  },

  getInitialRequestAddress: function() {
    return requestAddress;
  },

  setInitialRequestAddress: function(_requestAddress) {
    if( requestAddress == null ) {requestAddress = _requestAddress;}
  },

  dispatcherIndex: AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    //console.log( "action", action );
    switch(action.type){
      case AppConstants.LoginConstants.LOGIN_USER:
        _teacher = action.payload.teacher;
        _jwt = action.payload.jwt;
        createAvailableClass( _teacher );
        _teacherId = jwt_decode(_jwt).sub;
        break;

      case AppConstants.LoginConstants.SELECT_CLASS:
        currentClass = action.payload;
        break;

      case AppConstants.LoginConstants.DESELECT_CLASS:
        currentClass = null;
        break;
      
      case AppConstants.LoginConstants.LOAD_TEACHER:
        _teacher = action.payload;
        createAvailableClass( _teacher );
        _jwt = localStorage.getItem('jwt');
        break;
      
      case AppConstants.LoginConstants.LOGOUT_USER:
        _teacher = null;
        _teacherId = null;
        _jwt = null;
        break;
    }
    
    LoginStore.emitChange();
    
    return true;
  })

})

module.exports = LoginStore;