import '../Selector.css';
import './History.css';
import React from 'react';
import { getDataByFiveMin } from '../Overview/Overview';
import { getDataByOneHour } from '../Overview/Overview';
import { getDataByOneMin } from '../Overview/Overview';
import { getDataByOneWeek } from '../Overview/Overview';

export default class History extends React.Component {
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

    render(){
        let data;
        switch (this.state.selector) {
            case "ONE_MIN" : data = getDataByOneMin(); break;
            case "FIVE_MIN" : data = getDataByFiveMin(); break;
            case "ONE_HOUR" : data = getDataByOneHour(); break;
            case "ONE_WEEK" : data = getDataByOneWeek(); break;
            default : data = getDataByOneWeek(); 
        }
        return(
            <div className="myHistory">
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
                <div className="myTable">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>High</th>
                                <th>Low</th>
                                <th>Open</th>
                                <th>Close</th>
                                <th>% Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.sort((a, b) => parseInt(b.StartDate.split('/')[0]) - parseInt(a.StartDate.split('/')[0])).map(el => <tr key={el.Volume}>
                                <td>{el.StartDate}</td>
                                <td>{el.High}</td>
                                <td>{el.Low}</td>
                                <td>{el.Open}</td>
                                <td>{el.Close}</td>
                                <td>{el.Change}%</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
const clearActive = () => {
    document.querySelectorAll('.selector-btn').forEach(element => {
        element.classList.remove('active-selector');
    });
}