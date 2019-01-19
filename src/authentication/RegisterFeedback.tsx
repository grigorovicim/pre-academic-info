import {Component} from "react";
import * as React from 'react';
import './RegisterFeedback.css';
import loginLogo from './pre-academic-login-logo.png';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class RegisterFeedback extends Component<any, any>{

    constructor(props: any) {
        super(props)
    }

    render() {
        return(
            <div className={'p-register-feedback-div'}>
                <div className="p-login-logo">
                    <img className="p-login-logo-image" src={loginLogo}/>
                </div>
                A confirmation email was sent to your email address.
                <NavLink className="p-switch-to-login" to={"/"} style={{color: "green"}}> Login</NavLink>             
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
  return {
    user: Object.assign({}, state.app.user),
    errorMessage: state.app.errorMessage,
  };
};

export default connect(
  mapStateToProps,
)(RegisterFeedback);