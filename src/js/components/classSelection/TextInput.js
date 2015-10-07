
var React = require('react');
var ReactBootstrap 	= require('react-bootstrap'),
	PageHeader 		= ReactBootstrap.PageHeader,
	Glyphicon 		= ReactBootstrap.Glyphicon,
	Popover 		= ReactBootstrap.Popover,
	Panel 			= ReactBootstrap.Panel,
	Input 			= ReactBootstrap.Input,
	ButtonToolbar 	= ReactBootstrap.ButtonToolbar,
	Button 			= ReactBootstrap.Button;

var TextInput = React.createClass({

	getInitialState: function() {
		
		return ({
			condition: "viewing",
			value: this.props.value
		});
	},

	render: function() {
		
		var	value = this.sanitizeValueProp(),
			label,
			buttonFunction,
			valueComponent,
			glyphComponent,
			spanStyle = {
				float		: "left",
				width		: "80%", 
				border 		: "#ddd solid 1px", 
				borderRadius: "8px", 
				boxShadow 	: "#bbb 1px 1px 2px 0px", 
				lineHeight 	: "2.6", 
				paddingLeft : "5px"
			},
			inputStyle = {
				width		: "85%", 
				fontFamily	: "Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif"
			},
			displaySpan		= <div style={spanStyle}> {value} </div>,
			regularInput	= <input style={inputStyle} id="inputField" 	type="text" />,
			passwordInput	= <input style={inputStyle} id="passwordField"  type="password" />;

			
		// Set label and buttonFunction based on the state
		switch(this.state.condition){
			case "viewing":
				buttonFunction = this.toggleEdit;
				label 		   = this.props.label;
				valueComponent = displaySpan;
				glyphComponent = <Glyphicon glyph="pencil" />;
			break;

			case "verifying":
				buttonFunction = this.checkPassword;
				label 		   = "Enter old password...";
				valueComponent = passwordInput;
				glyphComponent = <Glyphicon glyph="log-in" />;
			break;

			case "comparing":
				buttonFunction = this.storePasswordComparison;
				label 		   = "Type new password...";
				valueComponent = passwordInput;
				glyphComponent = <Glyphicon glyph="saved" />;
			break;

			case "editing":
				buttonFunction = this.saveChanges;
				glyphComponent = <Glyphicon glyph="send" />;
				if (this.props.password) {
					label 	   	   = "Confirm new password...";
					valueComponent = passwordInput;
				} else {
					label 		   = this.props.label;
					valueComponent = regularInput;
				}
			break;
		}
		
		return (
			<div>
				<h6 style={{marginTop: "6px", marginBottom: "6px"}}>{label}</h6>
				<div style={{display:"flex", padding:"5px"}}>
					{valueComponent}
					<Button style={{marginLeft:"5%"}} onClick={buttonFunction}>{glyphComponent}</Button>
				</div>
			</div>		
		);
	},

	// Change from viewing panel to editing input
	toggleEdit: function() {

		if (this.props.password) {
			if (this.props.value !=  null) {
				this.setState({condition: "verifying", value: this.state.value});	
			} else {
				this.setState({condition: "comparing", value: this.state.value});
			}
			
		} else {
			this.setState({condition: "editing", value: this.state.value});
		}
	},

	// Take a password as input before allowing edits
	checkPassword: function() {

		var newValue = document.getElementById("passwordField").value;
		if (this.props.value == newValue) {

			document.getElementById("passwordField").value = "";
			this.setState({condition: "comparing", value: this.state.value});

		} else {
			alert("Wrong password");
		}
	},

	// Save first input of new password to compare with second try
	storePasswordComparison: function() {

		var newValue = document.getElementById("passwordField").value
		if (newValue != "") {

			document.getElementById("passwordField").value = "";
			this.setState({condition: "editing", value: newValue});

		}
	},

	// Save input value to user object
	saveChanges: function() {

		var newValue;
		if (this.props.password) {

			newValue = document.getElementById("passwordField").value;
			if (this.state.value == newValue) {

				this.props.onSave(newValue);
				this.setState({condition: "viewing", value: newValue});

			}
		} else {

			newValue = document.getElementById("inputField").value;
			if (newValue != "") {

				this.props.onSave(newValue);
				this.setState({condition: "viewing", value: newValue});

			}
		}
	},

	// Hide password value or return value prop as is
	sanitizeValueProp: function() {

		if (this.props.value != null && this.props.value != "") {
			if (this.props.password) {

				var passwordString = "";
				for (var i = 0; i < this.props.value.length; i++) {
					passwordString += "•";
				}
				return passwordString;
	
			} else {
				return this.props.value;
			}

		} else {
			return this.props.label + " Required"
		}

	}

});

module.exports = TextInput;