// @ts-ignore
import React, { Component } from 'react';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import { connect } from 'react-redux';
import './App.css';

import logo from './logo.png';

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      response: '',
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
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
        </header>
        <p className="p-app-intro">
        {this.state.response}
        </p>
      </div>
    );
  }
}

export default App;
