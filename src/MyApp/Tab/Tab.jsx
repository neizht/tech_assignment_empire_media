import React from 'react';
import './Tab.css';

export default class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
    }
    handleChange = (pageName) => {
       this.props.changeState(pageName);
    };

    render() {
        return(
            <div className="myTab">
                <span className="myBtn btn-active" id="overview-btn" onClick={() => {
                    document.querySelector('#overview-btn').classList.add('btn-active');
                    document.querySelector('#history-btn').classList.remove('btn-active');
                    this.handleChange('OVERVIEW');
                }}>
                    <p>Overview</p>
                </span>
                <span className="myBtn" id="history-btn" onClick={() => {
                    document.querySelector('#overview-btn').classList.remove('btn-active');
                    document.querySelector('#history-btn').classList.add('btn-active');
                    this.handleChange('HISTORY');
                }}>
                    <p>History</p>
                </span>
                <span className='tech'></span>
            </div>
        )
    }
}