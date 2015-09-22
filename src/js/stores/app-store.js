var AppDispatcher = require('../dispatchers/app-dispatcher');
var _ = require('lodash');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var RethinkApiUtils = require('./../utils/app-rethinkDataApiUtils');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _chapterInformation = [];

var _usersSessionView = [];

var _users = [];

var _viewToDateTime = new Date();

var _viewFromDateTime = new Date( _viewToDateTime.getDate() - 7 );

var _sessions = [];

var _chaptersDoneByUsers = [];

var courseProgress = null;

var loadedChapters = [];

var selectedChapter = null;

var markedAnswers = [];

function _getMostRecentSessionForUser(userId, sessions) {
   var timeDate = 0;
    for ( i = 0; i < sessions.length; i++ ) {
      if ( sessions[i].endDateTime > timeDate ){
        timeDate = sessions[i].endDateTime;
      }
    }
    return timeDate;
}

function markUserResponsesInChapter( users, selectedChapter, courseProgress ) {
  markedAnswers = [];
  if ( selectedChapter != null ){
    selectedChapter.interactions.map( function ( interaction, k ){
      var markedUsers = _users.map( function (user, i ) {
        if ( user.selected == true ){
          if ( courseProgress[user.id] ) {
            var myCourseProgress = courseProgress[user.id];
            var myResponse = _.find( myCourseProgress.interactionResponses, {'id': interaction.id} );
            if ( myResponse ) {
              if ( !myResponse.correctMarking ) {
                myResponse.correctMarking=0; //undefined
              }
              if ( myResponse.response ) {
                markedAnswers.push({
                  userId:user.id,
                  courseProgressId:myCourseProgress.id,
                  interactionId:interaction.id,
                  correctMarking:myResponse.correctMarking
                });
              }
            }
          }
        }
      });
    });
  }
}

function _markInteraction(userId, courseProgressId, interactionId, correct) {
  _.find( courseProgress[userId].interactionResponses, {'id':interactionId } ).correctMarking = correct;
  if ( _.find( markedAnswers, function(answer){
    return ( answer.userId == userId && answer.courseProgressId == courseProgressId && answer.interactionId == interactionId)
  })){
    _.find(markedAnswers, { 'userId':userId, 'courseProgressId':courseProgressId, 'interactionId':interactionId }).correctMarking = correct;
  } else {
    markedAnswers.push({
      userId:userId,
      courseProgressId:courseProgressId,
      interactionId:interactionId,
      correctMarking:correctMarking
    });
  }
}

function _loadCourseProgress( _courseProgress ) {
  courseProgress = _courseProgress;
}

function _selectUser( userId ) {
  _users.forEach( function ( n, key ) {
    if ( n.id == userId ) {
      _users[key].selected = true;
    }
  });
  markUserResponsesInChapter( _users, selectedChapter, courseProgress );
}

function _deselectUser( userId ) {
  _users.forEach( function ( n, key ) {
    if ( n.id == userId ) {
      _users[key].selected = false;
    }
  });
  markUserResponsesInChapter( _users, selectedChapter, courseProgress );
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

  logout: function(){
    this._chapterInformation = [];
    this._usersSessionView = [];
    this._users = [];
    this._viewToDateTime = new Date();
    this._viewFromDateTime = new Date( _viewToDateTime.getDate() - 7 );
    this._sessions = [];
    this._chaptersDoneByUsers = [];
    this.courseProgress = null;
    this.loadedChapters = [];
    this.selectedChapter = null;
    this.markedAnswers = [];
  },

  getViewFromDateTime: function() {
    return _viewFromDateTime;
  },

  getViewToDateTime: function() {
    return _viewToDateTime;
  },
  
  getUsers: function(){
    return _users;
  },

  getFromDateTime: function(){
    return _usersSessionView.fromDateTime;
  },

  getSessions: function() {
    return _sessions;
  },

  getChapterInformation: function() {
    return _chapterInformation;
  },

  getChapters: function() {
    return _chaptersDoneByUsers;
  },

  getSelectedChapter: function() {
    return selectedChapter;
  },

  getCourseProgress: function() {
    return courseProgress;
  },

  getAnswersArray: function() {
    return markedAnswers;
  },

  dispatcherIndex: AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.type){
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.item);
        break;

      case AppConstants.REMOVE_ITEM:
        _removeItem(payload.action.index);
        break;

      case AppConstants.INCREASE_ITEM:
        _increaseItem(payload.action.index);
        break;

      case AppConstants.UserActions.SELECT_CHAPTER:
        _selectChapter( action.id );
        break;

      case AppConstants.UserActions.SELECT_USER:
        _selectUser( action.id );
        break;

      case AppConstants.UserActions.DESELECT_USER:
        _deselectUser( action.id );
        break;

      case AppConstants.UserActions.MARK_RESPONSE:
        _markInteraction(action.userId, action.courseId, action.interactionId, action.correct);
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
        break;

      case AppConstants.ServerActions.LOAD_CHAPTERS_DATA:
        _loadChapterInformation(action.payload);
      break;
    }

    AppStore.emitChange();

    return true;
  })

})

module.exports = AppStore;