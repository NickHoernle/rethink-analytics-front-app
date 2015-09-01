var React = require('react');
var ReactD3 = require('react-d3-components');
var BarChart = ReactD3.BarChart;

var weekday = new Array(7);
weekday[0]=  "Su";
weekday[1] = "Mo";
weekday[2] = "Tu";
weekday[3] = "We";
weekday[4] = "Th";
weekday[5] = "Fr";
weekday[6] = "Sa";

function dateCheck ( fromDate, toDate, checkDate ) {
    if ( checkDate <= toDate && checkDate >= fromDate ) {
        return true;
    }
    return false;
}

var SessionBarChart = React.createClass({
    render: function() {
        var values = [];
        learningTimePerDay = [];
        var count = 0
        for(var i=this.props.endDate; i>this.props.startDate; i.setDate( i.getDate() - 1 ) ){
            learningTimePerDay[count] = 0;
            for ( var k=0 ; k<this.props.sessions.length ; k++ ) {
                var sessionStartDateTime = new Date( this.props.sessions[k].startDateTime );
                var sessionEndDateTime = new Date( this.props.sessions[k].endDateTime );
                var totalTime = 0;
                var p = new Date(i);
                p.setDate( p.getDate() + 1 )
                if ( dateCheck( i , p, sessionEndDateTime ) ) {
                    totalTime = Math.ceil( (sessionEndDateTime - sessionStartDateTime)/(1000*3600) );
                    learningTimePerDay[ count ] = learningTimePerDay[ count ] + totalTime;
                }
            }
            values.push({
                x: weekday[ i.getDay() ] + "/" + i.getDate() + "/" + i.getMonth(),
                y: learningTimePerDay[ count ]
            });
            count = count + 1;
        };
        
        var data = [{
            label: 'somethingA',
            values: values
        }];
        return (
            <BarChart
                data={data}
                width={800}
                height={400}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
        );
    }
});

module.exports = SessionBarChart;