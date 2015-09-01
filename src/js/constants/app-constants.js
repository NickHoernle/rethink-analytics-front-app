var keyMirror = require('keymirror');

module.exports = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREASE_ITEM: 'INCREASE_ITEM',
  DECREASE_ITEM: 'DECREASE_ITEM',

  UserActions: keyMirror({
    SELECT_CHAPTER: null,
    MARK_RESPONSE_AS_CORRECT: null,
    MARK_RESPONSE_AS_INCORRECT: null,
    SELECT_USER: null,
    DESELECT_USER: null
  }),

  ServerActions: keyMirror({
  	LOAD_SESSION_DATA: null,
    LOAD_CHAPTERS_DATA: null,
    LOAD_CHAPTER: null,
    LOAD_COURSE_PROGRESS: null,
    LOAD_USERS_DATA: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
