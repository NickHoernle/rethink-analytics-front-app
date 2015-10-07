var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
	Modal = ReactBootstrap.Modal,
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Button = ReactBootstrap.Button,
	Glyphicon = ReactBootstrap.Glyphicon;

var CreateClass = React.createClass({
	render: function() {
		return (
			<Modal show={this.props.showCreateClassModal} onHide={this.props.closeCreateClassModal}>
				<br />
				<ButtonToolbar>
					<Button className="btn-success" onClick={this.saveChanges} block><Glyphicon glyph="floppy-disk" /> Create Class </Button>
				</ButtonToolbar>
			</Modal>
		);

	},

	editFirstName: function(newValue) {
	},

	editLastName: function(newValue) {
	},

	editEmailAdress: function(newValue) {
	},

	editPassword: function(newValue) {
	},

	saveChanges: function() {
		this.props.closeCreateClassModal();
	}

});

module.exports = CreateClass;