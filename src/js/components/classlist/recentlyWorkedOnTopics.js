var React = require('react');
var TopicCompletionBattery = require('./topicCompletionBattery.js');

var RecentChaptersDisplay = React.createClass({
	render: function () {
		var chapterMapping = this.props.chapterMapping;
		var userChapters = this.props.userChapters;
		userChapters.sort(function(a, b){return b.lastActiveOnCourse-a.lastActiveOnCourse});
		return (
			<table>
				<tr>
					<td><TopicCompletionBattery chapter={userChapters[0]} chapterMapping={chapterMapping} /></td>
					<td><TopicCompletionBattery chapter={userChapters[1]} chapterMapping={chapterMapping} /></td>
				</tr>
			</table>
		)
	},
});

module.exports = RecentChaptersDisplay;