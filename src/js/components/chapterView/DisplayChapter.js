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

var DisplayChapter = React.createClass({
  	render:function(){
  		if( this.props.selectedChapter == null ) {
  			return (
  				null
  			);
  		}
      else if( this.props.courseProgress == null ) {
        return (
          null
        );
      }
        var headings = _.sortBy(_.where( this.props.selectedChapter.titles, {'type':'HEADING'} ), 'id' );
        var subheads = _.sortBy(_.where( this.props.selectedChapter.titles, {'type':'SUB_HEADING'} ), 'id' );
  			var sections = headings.map( function( section , i) {

          var headingId = section.id*100;            
          var selectedUserIds = _.pluck(_.filter( this.props.users , {"selected":true}), "id");
          var validCourseProgresses = _.filter(this.props.courseProgress, function( cp ) {
              return selectedUserIds.indexOf(cp.userId) > 0;
            });

          /*Get the marking summary from chapter*/
          var usersCount = _.map( validCourseProgresses , function ( cp ) {
            var count = _.countBy( _.filter( cp.interactionResponses , 
              function ( interaction ) {
                return interaction.id > headingId*100 && interaction.id < ( headingId+100 )*100 
              } ), 
              function ( resps ) {
              if ( resps.response != null ){
                switch ( resps.correct ){
                  case 0:
                    return "unmarked";
                    break;
                  case 1:
                    return "correct";
                    break;
                  case 2:
                    return "incorrect";
                    break;
                  }
                }
                return "interaction";
            });
            return count;
          });

          var numberOfCorrectAnswers = _.sum( usersCount, function( count ){ return count.correct; } );
          var numberOfIncorrectAnswers = _.sum( usersCount, function( count ){ return count.incorrect; } );
          var numberOfUnknownAnswers = _.sum( usersCount, function( count ){ return count.unmarked } );

          /*Get the subsections for this section*/
          var subHeadingsSorted = _.sortBy(_.filter( subheads, function(h) { return ( h.id > headingId && (h.id < (headingId+100) ) ); },'id'));
          var subHeadings = subHeadingsSorted.map( function ( subsection, k ) { 
              return ( <Subsections key={k} subsection={subsection} {...this.props} /> );
          }, this );


          var title = (
              <div><h style={{fontSize:"20px"}}>{section.headingValue}</h>
              <p style={{fontSize:"14px"}}><i>{numberOfCorrectAnswers} correct responses; {numberOfIncorrectAnswers}  incorrect responses; {numberOfUnknownAnswers} unmarked responses</i></p></div>
            );
          
          return(
                  <Panel key={i} collapsible defaultExpanded={false} header={title} >
                    {subHeadings}
                  </Panel>
                );
        }, this );
		return (
          <div>
            <h1 style={{fontSize:"24px", paddingLeft:"1cm"}}>{this.props.selectedChapter.name}</h1>
						{sections}
			    </div>
      );
  }
});

module.exports = DisplayChapter;