var React = require("react");
var _ = require('lodash');
var ReactBootstrap = require('react-bootstrap'),
    DropdownButton = ReactBootstrap.DropdownButton,
    MenuItem = ReactBootstrap.MenuItem;
var SelectChapter = require('./selectChapter');

var ChapterSelection = React.createClass({
  render: function() {
    var users = _.map(this.props.users, 'id');
  	var chapterMapping = this.props.chapterMapping;
  	var ChapterItems = this.props.chapters.map( function ( chapter , i ) {
  		if ( chapterMapping[chapter] ) {
  			return (
  					<SelectChapter users={users} label={chapterMapping[chapter].name + " (" + chapterMapping[chapter].grade + ")" } id={chapter} key={i} />
  				);
  		}
  	})
  	return (
  		<table>
            <tr>
              <td>
                <DropdownButton title='Select Chapter' id='bg-nested-dropdown-select-chapters'>
              	   {ChapterItems}
          		  </DropdownButton>
              </td>
          		<td style={{paddingLeft:"30px"}}>
            			<h1 style={{fontSize:"20px"}}>{this.props.selectedChapter}</h1>
          		</td>
        		</tr>
      	</table>
  	);
  }
});

module.exports = ChapterSelection;