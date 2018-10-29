// @ts-ignore
import React, { Component } from 'react';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import { connect } from 'react-redux';

import './Login.css';
import LoginActions from './Login.actions';
class Login extends Component<any, any> {

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
        <input ref={this.setUsernameInputRef} type="text" />
        <input ref={this.setPasswordInputRef} type="password" />
        <button onClick={this.handleSubmit}>LOGIN</button>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: Object.assign({}, state.app.user),
  };
};

export default connect(
  mapStateToProps,
)(Login);