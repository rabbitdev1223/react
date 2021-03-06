import React, { useEffect} from 'react';
import { useHistory } from 'react-router';
import axios from 'axios'
import CanvasJSReact from '../assets/canvasjs.react';
import AuthStore from "../store/AuthStore";

function Home() { 

    const history = useHistory()    
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    let chart;
    let dps1 = [];
    let dps2 = [];
    let dataLength = 4 * 3 * 60; // number of dataPoints visible at any point
    let xVal = dataLength / 4 ;

    const getTime = (date)=> {

        let now     = date; 
        let hour    = now.getHours();
        let minute  = now.getMinutes();
        let second  = now.getSeconds(); 
        
        if(hour.toString().length === 1) {
            hour = '0' + hour;
        }
        if(minute.toString().length === 1) {
            minute = '0' + minute;
        }
        if(second.toString().length === 1) {
            second = '0' + second;
        }   
        let time = hour + ':' + minute + ':' + second;   
        return time;
    }

    const initalizeChart = ()=>{

        let currentTime = new Date();
        currentTime.setSeconds(currentTime.getSeconds() - dataLength / 4);
        
        for(let i = 0; i < dataLength / 4; i++){

            currentTime.setSeconds(currentTime.getSeconds() + 1);
            let timeStr = getTime( currentTime);
            
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
        console.log("error");
    };

    const logout = (event) => {
        event.preventDefault();
        AuthStore.removeToken();
        history.push('/login');
    };

    useEffect(() => {
        initalizeChart();
        const interval = setInterval(()=>{
            axios.get('/users/getData').then(loadedData).catch(errorLoading);
        },1000);
        return () => clearInterval(interval);
    },[])

    const options = {
        
        animationEnabled: true,
        title: {
            text: "Graph Chart"
        },
        data: [{
            type: "spline",
            name: "Turtle",
            showInLegend: true,
            dataPoints: dps1
        },
        {
            type: "spline",
            name: "Rabbit",
            showInLegend: true,
            dataPoints: dps2
        }]
    }
    const logoutBtn = <button className="link-button nav-link" onClick={logout}> Logout</button>;

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">RampUp</div>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item active">
                            {AuthStore.isLoggedIn() && logoutBtn}
                        </li>
                    </ul>
                </div>
            </nav>

            <div style = {{marginTop:150}}>
                <CanvasJSChart options = {options} 
                    onRef={ref => chart = ref}
                />
            </div>
    </div>
    )
}

export default Home;
