import {Component} from "react";
import * as React from "react";
import { connect } from 'react-redux';
import Header from "../commons/header/Header";
import Login from 'src/authentication/Login';
import loginLogo from '../authentication/pre-academic-login-logo.png';
import './HomePage.css';

class HomePage extends Component<any,any>{

    constructor(props:any) {
      super(props);
    }


    public render (){
      if(this.props.user.isLoggedIn === false ) {
              return (
                  <div>
                      <Header home="inline" courses="none" students="none" catalog="none" myProfile="none" style={{}}/>
                      <Login/>
                  </div>
              )
          }
      else {
        return(
          <div className="p-home-page">
          <Header login="inline" courses="none" students="none" catalog="none" myProfile="none" style={{}}/>
          <div className="p-welcome-message">
            <div className="p-login-logo">
              <div className="p-login-welcome">Welcome</div>
              <img className="p-login-logo-image" src={loginLogo}/>
            </div>
            <div className="p-welcome-user-email">{this.props.user.userDetails.role === 1 ? "student" :  "professor"}</div>
            <div className="p-welcome-user-email" style={{color: '#6CB0E0'}}>{this.props.user.userDetails.username}</div>
            <div className="p-success-messege">Successfully logged in!</div>
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
)(HomePage);