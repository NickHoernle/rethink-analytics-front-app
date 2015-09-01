var React = require('react');
var _ = require('lodash');
var AppActions = require('../../actions/app-actions');
var UserResponse = require('./userResponse');
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
  		else {
        var headings = _.sortBy(_.where( this.props.selectedChapter.titles, {'type':'HEADING'} ), 'id' );
        var subheads = _.sortBy(_.where( this.props.selectedChapter.titles, {'type':'SUB_HEADING'} ), 'id' );
        var me = this;
        var _interactions = this.props.selectedChapter.interactions;
        //var _interactions = _.map( _.sortBy( this.props.selectedChapter.interactions , 'id' ) );
  			var sections = headings.map( function( section , i) {
          var headingId = section.id*100;
          var subHeadings = (_.sortBy(_.filter( subheads, function(h){
            return ( h.id > headingId && (h.id < (headingId+100) ) );
          }),'id')).map( function ( subsection, k ) {
              var subsectionId = subsection.id * 100;
              var interactions = (_.sortBy(_.filter( _interactions, function( inter ) {
                  return ( inter.id > subsectionId && inter.id < subsectionId + 100);
                }),'id' )).map ( function ( interaction, j ) {
                  switch ( interaction.type ) {
                    case "instruction":
                         return (
                                <Panel key={j} collapsible bsSize={"small"} defaultExpanded={false} header={<h style={{fontSize:"12px"}}><Glyphicon glyph="chevron-right" /></h>}>
                                  {interaction.value}
                                </Panel>
                            );
                      break;
                    case "prompt":
                          return (
                                  <Panel key={j} collapsible bsSize={"small"} defaultExpanded={true} header={<h><Glyphicon glyph="comment" /></h>}>
                                    {interaction.value}
                                    <UserResponse interactionId={interaction.id} users={me.props.users} sessions={me.props.sessions} courseProgress={me.props.courseProgress} />
                                  </Panel>
                            );
                      break;
                  }
                });
                return (<div key={k}>
                          <h style={{fontSize:"15px"}}>{subsection.headingValue}</h>
                          <hr/>
                            {interactions}
                        </div>
                  );
          });
          return  (
                      <Panel key={i} collapsible defaultExpanded={true} header={<h style={{fontSize:"20px"}}>{section.headingValue}</h>}>
                        {subHeadings
                        }
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