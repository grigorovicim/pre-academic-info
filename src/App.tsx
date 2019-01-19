// @ts-ignore
import React, { Component } from 'react';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import React, {Component} from 'react';
// @ts-ignore
import { connect } from 'react-redux';
// @ts-ignore
import {Route, BrowserRouter} from "react-router-dom";
import './App.css';

import HomePage from "./components/HomePage";
import CatalogPage from "./components/CatalogPage";
import MyProfilePage from "./components/myProfilePage/MyProfilePage";
// import AppActions from "./App.actions";
import Register from "./authentication/Register";
// import AddNewStudentToCourse from './students/AddNewStudentToCourse';
import CoursesPage from './components/CoursesPage';
import ComponentaCata from './components/ComponentaCata';


import AppActions from './App.actions';
// import logo from './logo.png';
// import Popup from './commons/Popup';

class App extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            response: '',
            isPopupVisible: false,
            popupComponentType: null,
        };
        this.props.dispatch(AppActions.checkAuthenticationToken());
        this.openLoginPopup = this.openLoginPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({response: res.express}))
            .catch(err => console.log(err));
    }

    closePopup() {
        this.setState({
            isPopupVisible: false,
        });
    }

    openLoginPopup(e: any) {
        e.stopPropagation();
        this.props.dispatch(AppActions.setIsAlert(false));
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
        // const detail = {
        //     name: "Design Patterns",
        //     professor: "Molnar Arthur",
        //     section: {name: 'English', nrGroups: 6},//nrGroups not in db
        //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        //     rules: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        //     courses: {number: 14, hours: 2, tests: 10, percentage: 60, writtenExam: 50, practicalExam: 20},
        //     labs: {number: 7, hours: 2, tests: 12, percentage: 30, professors: [{id: 1, name: "Molnar Arthur"}, {id: 2, name: "Cretu Maria"}]},
        //     seminars: {number: 14, hours: 2, tests: 2, percentage: 10, professors: {id: 1, name: "Molnar Arthur"}},
        //     groups: [932, 933, 934, 935],
        //     students: [{id: 1, name: "Antonesei Andrada"},{id:2, name: "Amariei Iuliana"},{id:3, name: "Blanariu Mihai"}]
        //   }
          return (
            <div className="p-app">
                <BrowserRouter>
                    <div>
                        <Route path={"/"} component={HomePage} exact/>
                        <Route path={"/courses"} component={CoursesPage}/>
                        <Route path={"/catalog"} component={CatalogPage} exact/>
                        <Route path={"/myprofile"} component={MyProfilePage} exact/>
                        <Route path={"/register"} component={Register}/>
                        <Route path={"/componenta"} component={ComponentaCata}/>
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