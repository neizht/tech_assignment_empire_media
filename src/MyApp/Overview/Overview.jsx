import '../Selector.css';
import thirtyMinData from '../../data/30_min_data.json';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { curveCardinal } from 'd3-shape';


export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.changeState.bind(this);
        this.state = { 
            selector: "ONE_MIN",
        };
    }
    changeState = (newSelectorValue) => {
        this.setState({ 
            selector: newSelectorValue,
        });
    };

    render() {
        let data;
        const cardinal = curveCardinal.tension(0.2);
        switch (this.state.selector) {
            case "ONE_MIN" : data = getDataByOneMin(); break;
            case "FIVE_MIN" : data = getDataByFiveMin(); break;
            case "ONE_HOUR" : data = getDataByOneHour(); break;
            case "ONE_WEEK" : data = getDataByOneWeek(); break;
            default : data = getDataByOneWeek(); 
        }
        return(
            <div className="myOverview">
                <div className="mySelector">
                    <span className='selector-btn active-selector' id='one-min-btn' onClick={() => { 
                        clearActive();
                        document.querySelector('#one-min-btn').classList.add('active-selector');
                        this.changeState('ONE_MIN');
                    }}>
                        <p>1 Minute</p>
                    </span>
                    <span className='selector-btn' id='five-min-btn' onClick={() => { 
                        clearActive();
                        document.querySelector('#five-min-btn').classList.add('active-selector');
                        this.changeState('FIVE_MIN');
                    }}>
                        <p>5 Minutes</p>
                    </span>
                    <span className='selector-btn' id='one-hour-btn' onClick={() => { 
                        clearActive();
                        document.querySelector('#one-hour-btn').classList.add('active-selector');
                        this.changeState('ONE_HOUR');
                    }}>
                        <p>1 Hour</p>
                    </span>
                    <span className='selector-btn' id='one-week-btn' onClick={() => { 
                        clearActive();
                        document.querySelector('#one-week-btn').classList.add('active-selector');
                        this.changeState('ONE_WEEK');
                    }}>
                        <p>1 Week</p>
                    </span>
                </div>
                <AreaChart
                    width={900}
                    height={400}
                    data={data}
                    margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                    }}
                   >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="High" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Area type={cardinal} dataKey="Low" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                </AreaChart>
            </div>
        )
    }
}
const clearActive = () => {
    document.querySelectorAll('.selector-btn').forEach(element => {
        element.classList.remove('active-selector');
    });
}
export const getDataByOneMin = () => {
    let res = [];
    for (let i = 0; i < thirtyMinData.length; i++) {
        if(thirtyMinData[i].StartDate === thirtyMinData[thirtyMinData.length - 1].StartDate){
            res.push(thirtyMinData[i]);
        }
    }
    return res;
}
export const getDataByFiveMin = () => {
    let res = [];
    for (let i = 0; i < thirtyMinData.length; i++) {
        if(thirtyMinData[i].StartDate === thirtyMinData[thirtyMinData.length - 1].StartDate){
            res.push(thirtyMinData[i]);
        }
    }
    return res;
}
export const getDataByOneHour = () => {
    let res = [];
    for (let i = 0; i < thirtyMinData.length; i++) {
        if(thirtyMinData[i].StartDate === thirtyMinData[thirtyMinData.length - 1].StartDate || (thirtyMinData[i].StartDate === '2/28/2023' && thirtyMinData[i].StartTime === '4:00:00 PM')){
            if(thirtyMinData[i].StartTime.split(':')[1] === '00'){
                res.push(thirtyMinData[i]);
            }
        }
    }
    return res;
}
export const getDataByOneWeek = () => {
    let res = [];
    thirtyMinData.forEach(element => {
        if(element.StartTime.split(':')[1] === '00'){
            res.push(element);
        }
    });     
    return res;
}