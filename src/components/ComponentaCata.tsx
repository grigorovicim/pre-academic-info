import {Component} from "react";
import * as React from "react";
import { connect } from 'react-redux';
import Header from "../commons/header/Header";
// import Login from 'src/authentication/Login';
// import loginLogo from '../authentication/pre-academic-login-logo.png';
import './HomePage.css';
import CourseDetail from "../courses/CourseDetail";
import Popup from "../commons/Popup";

class ComponentaCata extends Component<any,any>{

    constructor(props:any) {
      super(props);
        this.state ={
            isPopupVisible: true,
            popupComponentType: null,
        };
      this.closePopup = this.closePopup.bind(this);
    }

    closePopup() {
        this.setState({
            isPopupVisible: false,
        });
    }

    public render (){

        return(
          <div className="p-home-page">
          <Header login="inline" courses="none" students="none" catalog="none" myProfile="none" style={{}}/>
          <div className="p-welcome-message">

              <CourseDetail courseId={1}/>
              <Popup isVisible={this.state.isPopupVisible} onClose={this.closePopup} componentType={this.state.popupComponentType}/>
          </div>
          </div>
        )
      }
}

const mapStateToProps = (state: any) => {
  return {
    user: Object.assign({}, state.app.user),
  };
};

export default connect(

  mapStateToProps,
)(ComponentaCata);