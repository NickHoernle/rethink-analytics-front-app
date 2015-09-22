var AppDispatcher = require('../dispatchers/app-dispatcher');
var _ = require('lodash');
var AppConstants = require('../constants/app-constants');
var LoginConstants = require('../constants/LoginConstants');
var jwt_decode = require('jwt-decode');

var assign = require('react/lib/Object.assign');
var RethinkApiUtils = require('./../utils/app-rethinkDataApiUtils');
var AnalyticsApiUtils = require('./../utils/app-analyticsApiUtils');
var AuthService = require('./../utils/AuthService');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _teacherId = null;
var _jwt = null;
var _teacher = null;

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

  getJwt: function(){
    return _jwt;
  },

  dispatcherIndex: AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    //console.log( "action", action );
    switch(action.type){
      case LoginConstants.LOGIN_USER:
        _teacher = action.payload.teacher;
        _jwt = action.payload.jwt;
        _teacherId = jwt_decode(_jwt).sub;
        RethinkApiUtils.loadJwt( _jwt );
        AnalyticsApiUtils.loadJwt( _jwt );
        break;
      
      case LoginConstants.LOAD_TEACHER:
        _teacher = action.payload;
        break;
      
      case LoginConstants.LOGOUT_USER:
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