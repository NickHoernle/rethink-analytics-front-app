var React = require('react');
var Loading = require('react-loading');

var LoadingBar = React.createClass({
  render: function() {
    return (
    	<div style={{verticalAlign:"middle", textAlign:"center", marginTop:"100px"}}>
      		<Loading type='spokes' color='#e3e3e3' />
      	</div>
    );
  }
});

module.exports = LoadingBar;