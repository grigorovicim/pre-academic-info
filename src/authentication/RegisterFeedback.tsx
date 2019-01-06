import {Component} from "react";
import * as React from 'react';
import './RegisterFeedback.css';
import loginLogo from './pre-academic-login-logo.png';

class RegisterFeedback extends Component<any, any>{

    constructor(props: any) {
        super(props)
    }

    render(){
        return(
            <div className={'p-register-feedback-div'}>
                <div className="p-login-logo">
                    <img className="p-login-logo-image" src={loginLogo}/>
                </div>
                A confirmation email was sent to your email address.
            </div>
        )
    }
}

export default RegisterFeedback;