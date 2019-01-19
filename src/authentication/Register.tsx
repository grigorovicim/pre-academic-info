import { Component } from 'react';
import * as React from 'react';
import './Register.css'
import registerLogo from './pre-academic-login-logo.png';
import Header from "../commons/header/Header";
import LoginActions from "./Login.actions";
import { connect } from 'react-redux';
import Popup from "../commons/Popup";
import AppActions from '../App.actions';


class Register extends Component<any, any>{

    private firstNameInput: any;
    private lastNameInput: any;
    private email: any;
    private setFirstNameInputRef: any;
    private setEmailInputRef: any;
    private setLastNameInputRef: any;

    constructor(props: any) {
        super(props);
        this.state = {
            isPopupVisible: false,
            popupComponentType: null,
        };

        this.firstNameInput = null;
        this.lastNameInput = null;
        this.email = null;
        this.setFirstNameInputRef = (element: any) => {
            this.firstNameInput = element;
        };
        this.setLastNameInputRef = (element: any) => {
            this.lastNameInput = element;
        };
        this.setEmailInputRef = (element: any) => {
            this.email = element;
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openFeedbackPopup = this.openFeedbackPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    closePopup() {
        this.setState({
            isPopupVisible: false,
        });
    }
    openFeedbackPopup(e: any) {
        e.stopPropagation();
        this.props.dispatch(AppActions.setIsAlert(true));
        this.setState({
            isPopupVisible: true,
            popupComponentType: 'p-register-feedbackButton',
        });
        this.handleSubmit();
    }

    public handleSubmit(){
        const firstName = this.firstNameInput.value;
        const lastName = this.lastNameInput.value;
        const email = this.email.value;
        console.log("Registered user with first name="+ this.firstNameInput.value + ", last name=" + this.lastNameInput.value, ", email=" + this.email.value);
        this.props.dispatch(LoginActions.register(firstName, lastName, email));
    }

    render(){
        return (
            <div>
                <Header home="inline" courses="none" students="none" catalog="none" myProfile="none"
                        style={{}}/>
                <div className="p-register">
                    <div className="p-register-logo">
                        <div className="p-register-welcome">Welcome</div>
                        <img className="p-register-logo-image" src={registerLogo}/>
                    </div>
                    <input ref={this.setFirstNameInputRef} type="text" placeholder="first name"/>
                    <hr className="p-line-register"/>
                    <input ref={this.setLastNameInputRef} type="text" placeholder="last name"/>
                    <hr className="p-line-register"/>
                    <input ref={this.setEmailInputRef} type="email" placeholder="email"/>
                    <hr className="p-line-register"/>
                    <button onClick={this.openFeedbackPopup}>Register</button>
                </div>
                <Popup isVisible={this.state.isPopupVisible} onClose={this.closePopup} componentType={this.state.popupComponentType}/>
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
)(Register);