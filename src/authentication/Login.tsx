// @ts-ignore
import React, { Component } from 'react';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import { connect } from 'react-redux';

import './Login.css';
import LoginActions from './Login.actions';
export default class Login extends Component<any, any> {

  private usernameInput: any;
  private passwordInput: any;
  private setUsernameInputRef: any;
  private setPasswordInputRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      areInputsValid: true,
    };
    this.usernameInput = null;
    this.passwordInput = null;
    this.setUsernameInputRef = (element: any) => {
      this.usernameInput = element;
    };
    this.setPasswordInputRef = (element: any) => {
      this.passwordInput = element;
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  areInputsValid(username: any, password: any) {
    return username.length > 0 && password.length > 0;
  }

  handleSubmit = () => {
    const username = this.usernameInput.value;
    const password = this.passwordInput.value;
    this.props.dispatch(LoginActions.authenticate(username, password));
  }

  render() {
    return (
      <div className="p-login">
        <input ref={this.setUsernameInputRef} type="text" placeholder="email"/>
        <hr className="p-line-login"/>
        <input ref={this.setPasswordInputRef} type="password" placeholder="password"/>
        <hr className="p-line-login"/>
        <button onClick={this.handleSubmit}>LOGIN</button>
      </div>
    );
  }
}

