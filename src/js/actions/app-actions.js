var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var AppActions = {
  addItem: function(item){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM,
      item: item
    })
  },
  removeItem: function(index){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REMOVE_ITEM,
      index: index
    })
  },
  increaseItem: function(index){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.INCREASE_ITEM,
      index: index
    })
  },
  decreaseItem: function(index){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.DECREASE_ITEM,
      index: index
    })
  },
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
  deselectUser: function( id ){
    AppDispatcher.handleViewAction({
      type: AppConstants.UserActions.DESELECT_USER,
      id: id
    })
  },
  markResponseAsCorrect: function( userId, courseId, interactionId ){
    AppDispatcher.handleViewAction({
      type: AppConstants.UserActions.MARK_RESPONSE_AS_CORRECT,
      userId: userId,
      courseId: courseId,
      interactionId: interactionId
    })
  },
  markResponseAsIncorrect: function( userId, courseId, interactionId ){
    AppDispatcher.handleViewAction({
      type: AppConstants.UserActions.MARK_RESPONSE_AS_INCORRECT,
      userId: userId,
      courseId: courseId,
      interactionId: interactionId
    })
  },
}

module.exports = AppActions;
