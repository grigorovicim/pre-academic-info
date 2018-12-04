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
//import Popup from './commons/Popup';
//import Dashboard from './courses/Dashboard'
import CourseDetail from './courses/CourseDetail';

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
    /*
    const dummy = [
      {id:1, name: "LFTC", department: "info", isConfigured: false},
      {id:2, name: "PPD", department: "info", isConfigured: false},
      {id:3, name: "PLF", department: "info", isConfigured: true},
      {id:4, name: "Microcontrollers", department: "info", isConfigured: false},
      {id:5, name: "ASC", department: "info", isConfigured: true},
      {id:6, name: "MAP", department: "info", isConfigured: true},
    ]*/
    const detail = {
      name: "Design Patterns",
      number: 14,
      hours: 2,
      professor: "Molnar Arthur",
      section: {name: 'English', nrGroups: 6},//nrGroups not in db
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      rules: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      labs: {number: 7, hours: 2, practicals: 2, professors: [{id: 1, name: "Molnar Arthur"}, {id: 2, name: "Cretu Maria"}]},
      seminars: {number: 14, hours: 2, partials: 2, professors: {id: 1, name: "Molnar Arthur"}},
      groups: [932, 933, 934, 935],
      students: [{id: 1, name: "Antonesei Andrada"},{id:2, name: "Amariei Iuliana"},{id:3, name: "Blanariu Mihai"}]
    }
    return (
      <div className="p-app">
        <header className="p-app-header">
          <img src={logo} className="p-app-logo"/>
          <div className="p-login-button" onClick={this.openLoginPopup}>Login</div>
        </header>
        {/* <p className="p-app-intro">
        {this.state.response}
        </p> */}

        {/* <Popup isVisible={this.state.isPopupVisible} onClose={this.closePopup} componentType={this.state.popupComponentType}/> */}
        {/* <Dashboard courseItems={dummy}></Dashboard> */}
        <CourseDetail detail = {detail}></CourseDetail>
      </div>
    );
  }
}
export default App;
