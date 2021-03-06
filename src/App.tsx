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
//import Dashboard from './courses/Dashboard'
// import CourseDetail from "./courses/CourseDetail";
// @ts-ignore
import {Route, BrowserRouter} from "react-router-dom";
import './App.css';
import HomePage from "./components/HomePage";
import CatalogPage from "./components/CatalogPage";
import MyProfilePage from "./components/myProfilePage/MyProfilePage";
import AppActions from "./App.actions";
import Register from "./authentication/Register";
// import AddNewStudentToCourse from './students/AddNewStudentToCourse';
import CoursesPage from './components/CoursesPage';

// import CourseDetail from "./courses/CourseDetail";

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
        return (
            <div className="p-app">
                <BrowserRouter>
                    <div>
                        <Route path={"/"} component={HomePage} exact/>
                        <Route path={"/courses"} component={CoursesPage}/>
                        <Route path={"/catalog"} component={CatalogPage} exact/>
                        <Route path={"/myprofile"} component={MyProfilePage} exact/>
                        <Route path={"/register"} component={Register}/>
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