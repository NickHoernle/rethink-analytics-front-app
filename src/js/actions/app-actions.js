var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var AppActions = {
  selectChapter: function( id ){
    AppDispatcher.handleViewAction({
      type: AppConstants.UserActions.SELECT_CHAPTER,
      id: id
    })
  },
  selectUser: function( id ){
    AppDispatcher.handleViewAction({
      type: AppConstants.UserActions.SELECT_USER,
      id: id
    })
  },
  selectAllUsers: function(userIds){
    AppDispatcher.handleViewAction({
      type: AppConstants.UserActions.SELECT_ALL_USERS,
      userIds:userIds
    })
  },
  deselectAllUsers: function( ){
    AppDispatcher.handleViewAction({
      type: AppConstants.UserActions.DESELECT_ALL_USERS,
    })
  },
  deselectUser: function( id ){
    AppDispatcher.handleViewAction({
      type: AppConstants.UserActions.DESELECT_USER,
      id: id
    })
  },
  markResponse: function( userId, courseId, interactionId, correct ){
    AppDispatcher.handleViewAction({
      type: AppConstants.UserActions.MARK_RESPONSE,
      userId: userId,
      courseId: courseId,
      interactionId: interactionId,
      correct: correct
    })
  },
  loadMarkedResponses: function( markedResponses ) {
    AppDispatcher.handleViewAction({
      type: AppConstants.UserActions.LOAD_MARKED_RESPONSES,
      markedResponses: markedResponses
    })
  }
}

module.exports = AppActions;
