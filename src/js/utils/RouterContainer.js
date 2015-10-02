var _router = null;
var RouterContainer = {
  set: function(router){
  	_router = router;
  },
  get: function () { 
  	return _router 
  }
};

module.exports = RouterContainer;