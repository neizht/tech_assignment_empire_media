import React from 'react';
import { useState, useEffect  } from 'react';
import './Header.css';
import arrowDown from '../../img/arrow_down.png';
import arrowUp from '../../img/arrow_up.png';


export default function Header (){
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("");
    const [change, setChange] = useState("");
    const [percentChange, setPercentChange] = useState("");
    const subscription = {
        type: "SUBSCRIBE",
        instruments: ["s-aapl"],
    }
    const unSubscription = {
        type: "UNSUBSCRIBE",
        instruments: ["s-aapl"],
    }

    useEffect(() => {
        const ws = new WebSocket('wss://wstest.fxempire.com?token=btctothemoon');
        ws.onopen = () => {
            ws.send(JSON.stringify(subscription));
        };
        ws.onmessage = function (type) {
            const response  = JSON.parse(type.data)["s-aapl"];
            setDate(response.lastUpdate);
            if(response.last > response.previousClose) {
                document.querySelector('#arrow-down').style.display = 'none';
                document.querySelector('#arrow-up').style.display = 'block';
                setPrice(response.last);
            } else if (response.last < response.previousClose){
                document.querySelector('#arrow-down').style.display = 'block';
                document.querySelector('#arrow-up').style.display = 'none';
                setPrice(response.last);
            }
            if(response.change > 0){
                document.querySelector('#my-change').style.color = 'rgb(77, 148, 77)';
                setChange(response.change);
            } else if (response.change < 0){
                document.querySelector('#my-change').style.color = 'red';
                setChange(response.change);
            }
            if(response.percentChange > 0){
                document.querySelector('#my-percentChange').style.color = 'rgb(77, 148, 77)';
                setPercentChange(`(${response.percentChange})%`);
            } else if ((response.percentChange < 0)){
                document.querySelector('#my-percentChange').style.color = 'red';
                setPercentChange(`(${response.percentChange}%)`);
            }
        }
        ws.onclose = () => {
            ws.send(JSON.stringify(unSubscription));
        };
    })

    return (
        <div className="myHeader">
            <span>
                <h1 className='title'>Apple Inc</h1>
                <p className='subTitle'>As of: {date}</p>
            </span>
            <span>
                <div className='price'>
                <img src={arrowDown} alt="" className='arrow' id='arrow-down'/>
                <img src={arrowUp} alt="" className='arrow' id='arrow-up'/>
                    <p>{price}</p>
                </div>
                <div className="change">
                    <span id='my-change'>{change}</span>
                    <span id='my-percentChange'>{percentChange}</span>
                </div>
            </span>
        </div>  
    )
}