var React = require('react');
var AppActions = require('../../actions/app-actions');
var RethinkApiUtils = require('../../utils/app-rethinkDataApiUtils');
var ReactBootstrap = require('react-bootstrap'),
	Button = ReactBootstrap.Button,
    MenuItem = ReactBootstrap.MenuItem;

var SelectChapter = React.createClass({
  handler: function(){
    AppActions.selectChapter( this.props.id );
	RethinkApiUtils.loadCourseProgress(this.props.id, this.props.users );
  },
  render:function(){
    return <Button onClick={this.handler}>{this.props.label}</Button>
  }
});

module.exports = SelectChapter;
