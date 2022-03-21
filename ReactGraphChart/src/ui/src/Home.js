import React, {Component} from 'react';
import UserService from "./UserService";
import axios from 'axios'
import CanvasJSReact from './assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var startTime = 0, endTime = 0;
var dps1 = [];
var dps2 = [];

var dataLength = 4*3*60; // number of dataPoints visible at any point
var xVal = dataLength/4 ;
class Home extends Component {

   
    constructor(props) {
        super(props);
        this.state = {loading: true, errorMessage: undefined}
    }

    getCreatedDateString = (createdTimestamp) => {
        return new Date(createdTimestamp).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    
    getTime = (date)=> {
        var now     = date; 
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        
        if(hour.toString().length == 1) {
            hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
            minute = '0'+minute;
        }
        if(second.toString().length == 1) {
            second = '0'+second;
        }   
        var time = hour+':'+minute+':'+second;   
        return time;
    }

    initalizeChart = ()=>{
        var currentTime = new Date();
        currentTime.setSeconds(currentTime.getSeconds() - dataLength/4);
        
        for(var i=0;i<dataLength/4;i++){

            currentTime.setSeconds(currentTime.getSeconds() + 1);
            var timeStr = this.getTime( currentTime);
            console.log(timeStr);
            dps1.push({
                x: i,
                y: null,
                label: timeStr
            });
    
            dps1.push({
                x: i + 1,
                y: null,
                label:timeStr,
            });
    
            dps1.push({
                x: i + 2,
                y: null,
                label: timeStr
            });
    
            dps1.push({
                x: i + 3,
                y: null,
                label:timeStr,
            });
    
                   
            dps2.push({
                x: i,
                y: null,
                label:timeStr,
            });
    
            dps2.push({
                x: i + 1,
                y: null,
                label:timeStr,
            });
    
            dps2.push({
                x: i + 2,
                y: null,
                label:timeStr,
            });
    
            dps2.push({
                x: i + 3,
                y: null,
                label:timeStr,
            });
        }

      
           this.chart.render();
    }
    updateChart = (data) => {

     
        var timeStr = this.getTime(new Date());
          
        dps1.push({
            x: xVal,
            y: data.data1[0].y,
            label:timeStr,
        });

        dps1.push({
            x: xVal + 1,
            y: data.data1[1].y,
            label:timeStr,
        });

        dps1.push({
            x: xVal + 2,
            y: data.data1[2].y,
            label:timeStr,
        });

        dps1.push({
            x: xVal + 3,
            y: data.data1[3].y,
            label:timeStr,
        });

               
        dps2.push({
            x: xVal,
            y: data.data2[0].y,
            label:timeStr,
        });

        dps2.push({
            x: xVal + 1,
            y: data.data2[1].y,
            label:timeStr,
        });

        dps2.push({
            x: xVal + 2,
            y: data.data2[2].y,
            label:timeStr,
        });

        dps2.push({
            x: xVal + 3,
            y: data.data2[3].y,
            label:timeStr,
        });

        xVal = xVal + 4;

        if (dps1.length > dataLength) {
            dps1.shift();
            dps1.shift();
            dps1.shift();
            dps1.shift();

            dps2.shift();
            dps2.shift();
            dps2.shift();
            dps2.shift();
        }
        
      
        this.chart.render();
    };

    loadedData = (response) => {
        
        
        if (response.status === 200) {
                
            this.updateChart(response.data);
            
        } 
    };

    errorLoading = (err) => {
        this.setState({loading: false, errorMessage: 'There was an error loading your account.'});
    };

    

    componentDidMount() {

        
        this.initalizeChart();
        this.interval = setInterval(()=>{
            axios.get('/users/getData').then(this.loadedData).catch(this.errorLoading);
        },1000)
       
       
    }

    render() {

		
		const spanStyle = {
			position:'absolute', 
			top: '10px',
			fontSize: '20px', 
			fontWeight: 'bold', 
			backgroundColor: '#d85757',
			padding: '0px 4px',
			color: '#ffffff'
		}
		
		const options = {
			
			animationEnabled: true,
			title: {
				text: "Try Zooming - Panning"
			},
            
			data: [{
                type: "spline",
                name: "2016",
                showInLegend: true,
                dataPoints: 
                    dps1
        
            },
            {
                type: "spline",
                name: "2017",
                showInLegend: true,
                dataPoints: 
                    dps2
            }]
		}
		
		startTime = new Date();

     
        return (
            <div>
                <CanvasJSChart options = {options} 
                    onRef={ref => this.chart = ref}
                />
        </div>
        )
      
    }
}

export default Home;
