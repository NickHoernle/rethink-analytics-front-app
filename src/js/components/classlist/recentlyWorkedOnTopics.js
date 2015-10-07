var React = require('react');
var TopicCompletionBattery = require('./topicCompletionBattery.js');

var RecentChaptersDisplay = React.createClass({
	render: function () {
		var chapterMapping = this.props.chapterMapping;
		var userChapters = this.props.userChapters;
		if ( userChapters ) {
			if ( userChapters.length > 0 ) {
				var chapters = userChapters.sort(function(a, b){ return b.lastActiveOnCourse-a.lastActiveOnCourse} ).map(function( chapter , i ) {
					return ( <td key={i}><TopicCompletionBattery key={i} chapter={chapter} chapterMapping={chapterMapping} /></td> );
				});
				return (
					<table>
						<tr>
							{chapters}
						</tr>
					</table>
				)
			}
		}
		return (null);
	},
});

module.exports = RecentChaptersDisplay;