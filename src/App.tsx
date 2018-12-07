// @ts-ignore
import React, {Component} from 'react';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import React, {Component} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './App.css';

// import logo from './logo.png';
import Popup from './commons/Popup';
//import Dashboard from './courses/Dashboard'
// import CourseDetail from "./courses/CourseDetail";
// @ts-ignore
import {Route, Router, BrowserRouter} from "react-router-dom";
import './App.css';
// import logo from './logo.png';
// import Dashboard from './courses/Dashboard'
// import DashboardStudentsComplex from './students/DashboardStudentsComplex';
import DashboardProfessors from './professors/DashboardProfessors';
// import StudentsList from './students/StudentsList';
import CoursesPage from "./components/CoursesPage";
import HomePage from "./components/HomePage";
import StudentsPage from "./components/StudentsPage";
import CatalogPage from "./components/CatalogPage";
import MyProfilePage from "./components/MyProfilePage";

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
        this.setState({
            isPopupVisible: true,
            popupComponentType: 'p-login-button',
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

    render() {
        // const detail = {
        //     name: "Design Patterns",
        //     number: 14,
        //     hours: 2,
        //     professor: "Molnar Arthur",
        //     section: {name: 'English', nrGroups: 6},//nrGroups not in db
        //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        //     rules: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        //     labs: {
        //         number: 7,
        //         hours: 2,
        //         practicals: 2,
        //         professors: [{id: 1, name: "Molnar Arthur"}, {id: 2, name: "Cretu Maria"}]
        //     },
        //     seminars: {number: 14, hours: 2, partials: 2, professors: {id: 1, name: "Molnar Arthur"}},
        //     groups: [932, 933, 934, 935],
        //     students: [{id: 1, name: "Antonesei Andrada"}, {id: 2, name: "Amariei Iuliana"}, {
        //         id: 3,
        //         name: "Blanariu Mihai"
        //     }]
        // };
        return (
            <div className="p-app">
                <Popup isVisible={this.state.isPopupVisible} onClose={this.closePopup}
                       componentType={this.state.popupComponentType}/>
                {/* <Dashboard courseItems={dummy}></Dashboard> */}
                {/* <DashboardStudentsComplex studentItems={dummyStudents}></DashboardStudentsComplex>*/}
                <DashboardProfessors/>
                {/*<StudentsList></StudentsList>*/}
                {/*<CourseDetail detail={detail}/>*/}
                <BrowserRouter>
                    <div>
                        <Route path={"/"} component={HomePage} exact/>
                        <Route path={"/courses"} component={CoursesPage}/>
                        <Route path={"/students"} component={StudentsPage} exact/>
                        <Route path={"/catalog"} component={CatalogPage} exact/>
                        <Route path={"/myprofile"} component={MyProfilePage} exact/>
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