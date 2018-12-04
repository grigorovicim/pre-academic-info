// @ts-ignore
import React, { Component } from 'react';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import React, {Component} from 'react';
// @ts-ignore
import { connect } from 'react-redux';
import './App.css';

import Popup from './commons/Popup';
import Dashboard from './courses/Dashboard'
import Header from "./commons/header/Header";


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
  openLoginPopup(e: any) {
    e.stopPropagation();
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
    const dummy = [
      {id:1, name: "LFTC", department: "info", isConfigured: false},
      {id:2, name: "PPD", department: "info", isConfigured: false},
      {id:3, name: "PLF", department: "info", isConfigured: true},
      {id:4, name: "Microcontrollers", department: "info", isConfigured: false},
      {id:5, name: "ASC", department: "info", isConfigured: true},
      {id:6, name: "MAP", department: "info", isConfigured: true},
    ];
    return (
      <div className="p-app">

        <Header login="none" courses="inline" students="none" catalog="none" myProfile="none"/>

        <Popup isVisible={this.state.isPopupVisible} onClose={this.closePopup} componentType={this.state.popupComponentType}/>
        <Dashboard courseItems={dummy}/>
      </div>
    );
  }
}
export default App;
