import React, {Component, useEffect} from 'react';
import axios from 'axios'
import CanvasJSReact from './assets/canvasjs.react';

function Home() { 

    let chart;

    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    let dps1 = [];
    let dps2 = [];

    let dataLength = 4*3*60; // number of dataPoints visible at any point
    let xVal = dataLength/4 ;

    const getTime = (date)=> {
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

    const initalizeChart = ()=>{
        var currentTime = new Date();
        currentTime.setSeconds(currentTime.getSeconds() - dataLength/4);
        
        for(var i=0;i<dataLength/4;i++){

            currentTime.setSeconds(currentTime.getSeconds() + 1);
            var timeStr = getTime( currentTime);
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

      
           chart.render();
    }
    const updateChart = (data) => {

     
        var timeStr = getTime(new Date());
          
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
        
      
        chart.render();
    };

    const loadedData = (response) => {
        
        
        if (response.status === 200) {
                
            updateChart(response.data);
            
        } 
    };
    
    const errorLoading = (err) => {

    };

    useEffect(()=>{
        initalizeChart();
        const interval = setInterval(()=>{
            axios.get('/users/getData').then(loadedData).catch(errorLoading);
        },1000)
       
    })

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

    return (
        <div>
            <CanvasJSChart options = {options} 
                onRef={ref => chart = ref}
            />
    </div>
    )
      

}

export default Home;
