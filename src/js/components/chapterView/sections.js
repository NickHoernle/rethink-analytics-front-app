var React = require('react');
var _ = require('lodash');

var AppActions = require('../../actions/app-actions');
var UserResponse = require('./userResponse');
var Subsections = require('./subsections');
var AppStore = require('../../stores/app-store');

var ReactBootstrap = require('react-bootstrap'),
	Panel = ReactBootstrap.Panel,
	ButtonToolbar = ReactBootstrap.ButtonToolbar,
	Glyphicon = ReactBootstrap.Glyphicon,
	Button = ReactBootstrap.Button,
	Well = ReactBootstrap.Well;

function getStateFromStores(){
  var answersArray = AppStore.getAnswersArray();
  return ({
    answersArray:answersArray
  });
}

var DisplayChapter = React.createClass({
    getInitialState: function() {
      return ( getStateFromStores() );
    },

    componentDidMount: function() {
      AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      AppStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState( getStateFromStores() );
    },

  	render:function(){
  		if( this.props.selectedChapter == null ) {
  			return (
  				null
  			);
  		}
  		else {
        var headings = _.sortBy(_.where( this.props.selectedChapter.titles, {'type':'HEADING'} ), 'id' );
        var subheads = _.sortBy(_.where( this.props.selectedChapter.titles, {'type':'SUB_HEADING'} ), 'id' );
        var me = this;

  			var sections = headings.map( function( section , i) {
          var headingId = section.id*100;
          var subHeadings = (_.sortBy(_.filter( subheads, function(h){
            return ( h.id > headingId && (h.id < (headingId+100) ) );
          }),'id')).map( function ( subsection, k ) {
            return (
              <Subsections key={k} subsection={subsection} selectedChapter={me.props.selectedChapter} users={me.props.users} sessions={me.props.sessions} courseProgress={me.props.courseProgress} />
            );
          });
          var answersArray = _.filter( me.state.answersArray, function ( answer ){
            return ( (headingId*100 < answer.interactionId) && (answer.interactionId < (headingId+100)*100) );
          });
          var numberOfCorrectAnswers = (_.filter( answersArray , {"correctMarking":1} ).length || 0);
          var numberOfIncorrectAnswers = (_.filter( answersArray , {"correctMarking":2} ).length || 0);
          var numberOfUnknownAnswers = (_.filter( answersArray , {"correctMarking":0} ).length ||0 );
          var title = (
              <div><h style={{fontSize:"20px"}}>{section.headingValue}</h>
              <p style={{fontSize:"14px"}}><i>{numberOfCorrectAnswers} correct responses; {numberOfIncorrectAnswers}  incorrect responses; {numberOfUnknownAnswers} unmarked responses</i></p></div>
            );
          return(
                  <Panel key={i} collapsible defaultExpanded={false} header={title} >
                    {subHeadings}
                  </Panel>
                );
        });
	  		return (
              <div>
	  						{sections}
	  			    </div>
          );
	  	}
  	}
});

module.exports = DisplayChapter;