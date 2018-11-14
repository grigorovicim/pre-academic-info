// @ts-ignore
import React, { Component } from 'react';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import React, {Component} from 'react';
// @ts-ignore
import { connect } from 'react-redux';
import './App.css';

import logo from './logo.png';
import Popup from './commons/Popup';
import DashboardCourseItem from './courses/DasboardCourseItem'

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      response: '',
      isPopupVisible: false,
      popupComponentType: null,
    };
    this.openLoginPopup = this.openLoginPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  closePopup() {
    this.setState({
      isPopupVisible: false,
    });
  }
  openLoginPopup() {
    this.setState({
      isPopupVisible: true,
      popupComponentType: 'p-login-button',
    });
  }
 

  callApi = async () => {
    const response = await fetch('/check-server');
    const body = await response.json();

    if (response.status !== 200) { 
      throw Error(body.message); 
    }

    return body;
  };

  public render() {
    return (
      <div className="p-app">
        <header className="p-app-header">
          <img src={logo} className="p-app-logo"/>
          <div className="p-login-button" onClick={this.openLoginPopup}>Login</div>
        </header>
        <p className="p-app-intro">
        {this.state.response}
        </p>
        
        <Popup isVisible={this.state.isPopupVisible} onClose={this.closePopup} componentType={this.state.popupComponentType}/>
        <DashboardCourseItem name="PPD" isConfigured={true}/>
        <DashboardCourseItem name="LFTC" isConfigured={false}/>
      </div>
    );
  }
}
export default App;
