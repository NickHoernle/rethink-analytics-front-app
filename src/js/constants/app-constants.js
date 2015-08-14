var keyMirror = require('keymirror');

module.exports = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREASE_ITEM: 'INCREASE_ITEM',
  DECREASE_ITEM: 'DECREASE_ITEM',

  ServerActions: keyMirror({
  	LOAD_SESSION_DATA: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
