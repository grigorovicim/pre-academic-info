// @ts-ignore
import React, { Component } from 'react';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import React, {Component} from 'react';
// @ts-ignore
import { connect } from 'react-redux';
// @ts-ignore
import {Route, Router, BrowserRouter, withRouter} from "react-router-dom";
import './App.css';
// import logo from './logo.png';
import Popup from './commons/Popup';
// import Dashboard from './courses/Dashboard'
// import DashboardStudentsComplex from './students/DashboardStudentsComplex';
// import DashboardProfessors from './professors/DashboardProfessors';
// import StudentsList from './students/StudentsList';
import CoursesPage from "./components/CoursesPage";
import HomePage from "./components/HomePage";
import StudentsPage from "./components/StudentsPage";
import CatalogPage from "./components/CatalogPage";
import MyProfilePage from "./components/MyProfilePage";
import Register from "./authentication/Register";



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
      popupComponentType: 'p-login-whichButton',
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
    return (
      <div className="p-app">
        /*<Popup isVisible={this.state.isPopupVisible} onClose={this.closePopup} componentType={this.state.popupComponentType}/>*/
        <BrowserRouter>
          <div>
              <Route path={"/"} component={HomePage} exact/>
              <Route path={"/courses"} component={CoursesPage}/>
              <Route path={"/students"} component={StudentsPage} exact/>
              <Route path={"/catalog"} component={CatalogPage} exact/>
              <Route path={"/myprofile"} component={MyProfilePage} exact/>
              <Route path={"/register"} component={Register} exact/>
          </div>
        </BrowserRouter>
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
)(App);

