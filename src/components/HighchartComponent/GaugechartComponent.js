
import React from 'react';

export class GaugechartComponent extends React.Component{
constructor(props){
    super(props)
}
componentDidMount(){
    var _this = this;
    console.log(this.props.scoreval);
    var options = {
        title:{
            text:''
        },
        chart: {
            type: 'gauge',
            backgroundColor: "#F0F0F0",
            height:"300px",
            color:"white",
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            
        },
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: []
        },
       
        // the value axis
        
        yAxis: {
            min: 0,
            max: 900,
    
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',
    
            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'points'
            },
            plotBands: [{
                from: 0,
                to: 650,
                color: '#DF5353' // red
            }, {
                from: 650,
                to: 700,
                color: '#DDDF0D' // yellow
            }, {
                from: 700,
                to: 900,
                color: '#55BF3B' // green
            }]
        },
        series: [{
            name: _this.props.titleval,
            data: [{y:parseInt(_this.props.scoreval)}],
            tooltip: {
                valueSuffix: ' points'
            }}]
        }
        Highcharts.chart(this.props.container, options)
}
componentWillUnmount() {
}
render() {
    return <div id = {this.props.container}></div>
}

}
// Add some life

