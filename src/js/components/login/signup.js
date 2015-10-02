var React = require('react');
var reactMixin = require('react-mixin');
var Auth = require('../../utils/AuthService');

var Signup = React.createClass({
  getInitialState: function() {
    return ({
        user: "",
        password: ""
      });
  },

  componentWillMount: function() {
  },

  componentDidMount: function() {
    this.changeListener = this._onChange.bind(this);
    //LoginStore.addChangeListener(this.changeListener);
  },

  componentWillUnmount: function() {
    //LoginStore.removeChangeListener(this.changeListener);
  },

  _onChange: function() {
    this.setState(this._getLoginState());
  },

  login: function(e) {
    e.preventDefault();
    console.log("Signup");
    // Here, we call an external AuthService. We’ll create it in the next step
    //Auth.login(this.state.user, this.state.password)
      //.catch(function(err) {
        //console.log(“Error logging in”, err);
      //});
  },

  render: function(){
    return(
      reactMixin(Login.prototype, React.addons.LinkedStateMixin),
      <div className="login jumbotron center-block">
        <h1>Sign Up</h1>
        <form role="form">
          <div className="form-group">
            <td>
              <label htmlFor="firstName">First Name</label>
              <input type="text" valueLink={this.linkState('user')} className="form-control" id="firstName" placeholder="First Name" />
            </td>
            <td>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" valueLink={this.linkState('user')} className="form-control" id="lastName" placeholder="Last Name" />
            </td>
          </div>
          <div className="form-group">
            <label htmlFor="emailAddress">First Name</label>
            <input type="text" valueLink={this.linkState('user')} className="form-control" id="emailAddress" placeholder="Email Address" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Sign Up</button>
        </form>
      </div>
    );
  }
})

// We’re using the mixin `LinkStateMixin` to have two-way databinding between our component and the HTML.
module.exports = Signup;
//reactMixin(Login.prototype, React.addons.LinkedStateMixin);