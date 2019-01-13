// @ts-ignore
import React, {Component} from 'react';
// @ts-ignore
import React, {Component} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
// @ts-ignore
import {Route, BrowserRouter} from "react-router-dom";
import './App.css';
import CoursesPage from "./components/CoursesPage";
import HomePage from "./components/HomePage";
import StudentsPage from "./components/StudentsPage";
import CatalogPage from "./components/CatalogPage";
import Register from "./authentication/Register";
import AppActions from './App.actions';
import MyProfilePage from "./components/myProfilePage/MyProfilePage";
// import AddNewStudentToCourse from './students/Add-new-students/AddNewStudentToCourse';
// import logo from './logo.png';
// import Popup from './commons/Popup';
// import Dashboard from './courses/Dashboard'
// import DashboardStudentsComplex from './students/DashboardStudentsComplex';
// import DashboardProfessors from './professors/DashboardProfessors';
// import StudentsList from './students/StudentsList';
// import AddNewStudentToCourse from './students/Add-new-students/AddNewStudentToCourse';
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
                        <Route path={"/students"} component={StudentsPage} exact/>
                        <Route path={"/catalog"} component={CatalogPage} exact/>
                        <Route path={"/myprofile"} component={MyProfilePage} exact/>
                        <Route path={"/register"} component={Register}/>
                    </div>
                </BrowserRouter>
                {/* <AddNewStudentToCourse></AddNewStudentToCourse> */}
            </div>
        );
    }

//   public render() {
//     // const dummy = [
//     //   {id:1, name: "LFTC", department: "info", isConfigured: false},
//     //   {id:2, name: "PPD", department: "info", isConfigured: false},
//     //   {id:3, name: "PLF", department: "info", isConfigured: true},
//     //   {id:4, name: "Microcontrollers", department: "info", isConfigured: false},
//     //   {id:5, name: "ASC", department: "info", isConfigured: true},
//     //   {id:6, name: "MAP", department: "info", isConfigured: true},
//     // ]
    
//     // const dummyStudents = [
//     //   {id:1, name:'Nicole', email:'ddie2108@cs.ubbcluj.ro', section:'Info Engleza', year_of_study:1},
//     //   {id:1, name:'Bianca', email:'diie2318@cs.ubbcluj.ro', section:'Info Engleza', year_of_study:2}
//     // ]
//     return (
//       <div className="p-app">
//         <header className="p-app-header">
//           <img src={logo} className="p-app-logo"/>
//           <div className="p-login-button" onClick={this.openLoginPopup}>Login</div>
//         </header>
//         {/* <p className="p-app-intro">
//         {this.state.response}
//         </p> */}

//         <Popup isVisible={this.state.isPopupVisible} onClose={this.closePopup} componentType={this.state.popupComponentType}/>
//         {/* <Dashboard courseItems={dummy}></Dashboard> */}
        
//         {/* <DashboardStudentsComplex studentItems={dummyStudents}></DashboardStudentsComplex> */}
//         {/* <DashboardProfessors></DashboardProfessors> */}
//         {/* <StudentsList></StudentsList> */}
        
//         <hr></hr>

//         <AddNewStudentToCourse></AddNewStudentToCourse>

//       </div>
//     );
//   }

}

const mapStateToProps = (state: any) => {
    return {
        user: Object.assign({}, state.app.user),
    };
};

export default connect(
    mapStateToProps,
)(App);

