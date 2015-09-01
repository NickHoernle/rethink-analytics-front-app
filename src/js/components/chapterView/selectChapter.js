var React = require('react');
var AppActions = require('../../actions/app-actions');
var RethinkApiUtils = require('../../utils/app-rethinkDataApiUtils');
var ReactBootstrap = require('react-bootstrap'),
    MenuItem = ReactBootstrap.MenuItem;

var SelectChapter = React.createClass({
  handler: function(){
    AppActions.selectChapter( this.props.id );
	RethinkApiUtils.loadCourseProgress(this.props.id, this.props.users );
  },
  render:function(){
    return <MenuItem onClick={this.handler}>{this.props.label}</MenuItem>
  }
});

module.exports = SelectChapter;
