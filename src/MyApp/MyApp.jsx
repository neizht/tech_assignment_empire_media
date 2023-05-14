import React from 'react';
import './MyApp.css';
import Header from './Header/Header';
import Tab from './Tab/Tab';
import Overview from './Overview/Overview';
import History from './History/History';

export default class MyApp extends React.Component {
    constructor(props) {
        super(props);
        this.changeState.bind(this);
        this.state = { 
            page: "OVERVIEW", 
            selector: "ONE_MIN",
        };
    }
    changeState = (newPageValue) => {
        this.setState({ 
            page: newPageValue, 
        });
    };

    render(){
      let page;
        if(this.state.page === 'OVERVIEW'){
            page = <Overview/>;
        } else {
            page = <History/>;
        }
        return (
            <div className='myApp'>
                <Header/>
                <Tab changeState={this.changeState}/>
                {page}
            </div>
        )
    }
}