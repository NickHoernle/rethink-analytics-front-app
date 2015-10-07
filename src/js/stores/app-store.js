var AppDispatcher = require('../dispatchers/app-dispatcher');
var _ = require('lodash');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var RethinkApiUtils = require('./../utils/app-rethinkDataApiUtils');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _chapterInformation = []; // stores a mapping of chapterId to chapter information createdDateTime, grade, gradeName, name, subjectName

var selectedChapter = null; //used

var _users = []; // used

var _chaptersDoneByUsers = []; // used

var courseProgressForAllUsers = null; // used

var markedAnswers = []; //used


var _usersSessionView = [];

var _viewToDateTime = new Date();

var _viewFromDateTime = new Date( _viewToDateTime.getDate() - 7 );

var _sessions = [];

var loadedChapters = [];


function _logout(){
    _chapterInformation = [];
    _usersSessionView = [];
    _users = [];
    _viewToDateTime = new Date();
    _viewFromDateTime = new Date( _viewToDateTime.getDate() - 7 );
    _sessions = [];
    _chaptersDoneByUsers = [];
    courseProgressForAllUsers = null;
    loadedChapters = [];
    selectedChapter = null;
    markedAnswers = [];
}

function _loadCourseProgress( _courseProgress ) {
  courseProgressForAllUsers = _courseProgress;
}


function _selectChapter( id ) {
  if ( loadedChapters[ id ] != null ) {
    selectedChapter = loadedChapters[ id ];
  } else {
    RethinkApiUtils.loadChapter( id );
  }
  // new chapters selected therefore set selectedUsers to false:
  _.forEach( _users, function( user ){ user.selected = false});
}

function _loadChapter( chapter ) {
  loadedChapters[chapter.id] = chapter;
  selectedChapter = chapter;
}

function _loadSessionData( sessions ){
  _sessions = sessions; 
}


function _getMostRecentSessionForUser(userId, sessions) {
   var timeDate = 0;
    for ( i = 0; i < sessions.length; i++ ) {
      if ( sessions[i].endDateTime > timeDate ){
        timeDate = sessions[i].endDateTime;
      }
    }
    return timeDate;
}

function _loadChapterInformation( chapters ){
  // sanitise the chapters here
  _chapterInformation = [];
  for ( var gr in chapters._embedded.grades ) {
    var grade = chapters._embedded.grades[gr];
    for ( var subj in grade.subjects ) {
      var subject = grade.subjects[subj];
      for ( var cour in subject.coursesInSubject ) {
        var course = subject.coursesInSubject[cour];
        for ( var chapt in course.historyOfCourses )
        {
          _chapter = course.historyOfCourses[chapt];
          var chapter = {
            grade:grade.number,
            subjectName:subject.name,
            gradeName:grade.name,
            createdDateTime:chapt,
            name:course.currentName
          }
          _chapterInformation[_chapter] = chapter;
          _chapterInformation.length++;
        }
      }
    }
  }
}

function _loadUsersData( users ) {
    _users = users;
    if ( users.length > 0 ){ 
      _loadActiveChapters( users );
    }
}

function _loadActiveChapters( users ) {
  var chapters = [];
  for ( var u in users ) {
    var user = users[u];
    user.selected=false;
    for ( ch in user.chaptersWorkedOn ) {
      var id = user.chaptersWorkedOn[ch].courseId;
      var lastActive = user.chaptersWorkedOn[ch].lastActiveOnCourse;
      var numberOfCompletedInteractions = user.chaptersWorkedOn[ch].numberOfCompletedInteractions;
      var requiredNumberOfInteractions = user.chaptersWorkedOn[ch].requiredNumberOfInteractions;
      if ( numberOfCompletedInteractions > 5 ) {
        if( !(_.find( chapters, {'id':id } )) && lastActive > 0 ){
          chapters.push(
          {
            'id':id,
            'lastActive':lastActive,
            'numberOfCompletedInteractions':numberOfCompletedInteractions,
            'requiredNumberOfInteractions':requiredNumberOfInteractions
          });
        } else {
            if ( lastActive > _.result(_.find( chapters, {'id':id } ), 'lastActive' ) ) {
              _.find( chapters, {'id':id } ).lastActive = lastActive;
            }
        }
      }
    }
  }
  _chaptersDoneByUsers = chapters;
}

function _updateViewFromDateTime( dateTime ) {
  _viewFromDateTime = dateTime;
}

function _updateViewToDateTime( dateTime ) {
  _viewToDateTime = dateTime;
}

var AppStore = assign(EventEmitter.prototype, {
  emitChange: function(){
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },

  //used
  getUsers: function(){ //get student's in class
    return _users;
  },

  //used
  getChapterInformation: function() {
    return _chapterInformation;
  },

  getViewFromDateTime: function() {
    return _viewFromDateTime;
  },

  getViewToDateTime: function() {
    return _viewToDateTime;
  },

  getFromDateTime: function(){
    return _usersSessionView.fromDateTime;
  },

  getSessions: function() {
    return _sessions;
  },

  getChaptersDoneByUsers: function() {
    return _chaptersDoneByUsers;
  },

  getSelectedChapter: function() {
    return selectedChapter;
  },

  getCourseProgress: function() {
    return courseProgressForAllUsers;
  },

  //used
  getAnswersArray: function() {
    return markedAnswers;
  },

  dispatcherIndex: AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.type){
      case AppConstants.UserActions.SELECT_CHAPTER:
        _selectChapter( action.id );
        break;

      case AppConstants.UserActions.SELECT_USER:
        _.find( _users , {'id':action.id } ).selected = true;
        break;

      case AppConstants.UserActions.SELECT_ALL_USERS:
        _users.forEach( function ( n, key ) {
          if( action.userIds.indexOf( n.id ) >= 0){
            _users[key].selected = true;
          }
        });
        break;

      case AppConstants.UserActions.DESELECT_ALL_USERS:
        _users.forEach( function ( n, key ) {
          _users[key].selected = false;
        });
        break;

      case AppConstants.UserActions.DESELECT_USER:
        _.find( _users , {'id':action.id } ).selected = false;
        break;

      case AppConstants.UserActions.MARK_RESPONSE:
        console.log ( action )
        _.find( _.find( courseProgressForAllUsers, {"userId":action.userId} ).interactionResponses , {"id": action.interactionId} ).correct = action.correct;
        break;

      case AppConstants.UserActions.LOAD_MARKED_RESPONSES:
        _loadMarkedResponses( action.markedResponses );
        break;

      case AppConstants.ServerActions.LOAD_CHAPTER:
        _loadChapter( action.payload );
        break;

      case AppConstants.ServerActions.LOAD_SESSION_DATA:
        _loadSessionData(action.payload);
        break;

      case AppConstants.ServerActions.LOAD_USERS_DATA:
        _loadUsersData(action.payload);
        break;

      case AppConstants.ServerActions.LOAD_COURSE_PROGRESS:
        _loadCourseProgress(action.payload);
        console.log( action.payload );
        break;

      case AppConstants.ServerActions.LOAD_CHAPTERS_DATA:
        _loadChapterInformation(action.payload);
      break;

      case AppConstants.LoginConstants.LOGOUT_USER:
        _logout();
      break;
    }

    AppStore.emitChange();

    return true;
  })

})

module.exports = AppStore;