import { Component } from 'react';
import * as React from 'react';
import './Register.css'
import registerLogo from './pre-academic-login-logo.png';
import Header from "../commons/header/Header";
import LoginActions from "./Login.actions";
import { connect } from 'react-redux';
import RegisterFeedback from "./RegisterFeedback";

class Register extends Component<any>{

    private firstNameInput: any;
    private lastNameInput: any;
    private email: any;
    private setFirstNameInputRef: any;
    private setEmailInputRef: any;
    private setLastNameInputRef: any;

    constructor(props: any){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    }

    public handleSubmit(){
        const firstName = this.firstNameInput.value;
        const lastName = this.lastNameInput.value;
        const email = this.email.value;
        console.log("Registered user with first name="+ this.firstNameInput.value + ", last name=" + this.lastNameInput.value, ", email=" + this.email.value);
        this.props.dispatch(LoginActions.register(firstName, lastName, email));
    }

    render(){
        if(this.props.user.userDetails == null){
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
                        <button onClick={this.handleSubmit}>Register</button>
                    </div>
                </div>
            );
        }
            else{
                return(
                    <div>
                        <Header home="inline" courses="none" students="none" catalog="none" myProfile="none" style={{}}/>
                        <div className="p-register">
                            <RegisterFeedback/>
                        </div>
                    </div>
                )
            }
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