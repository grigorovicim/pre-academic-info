import {Component} from "react";
import Header from "../commons/header/Header";
import Dashboard from "../courses/Dashboard";
// import AppActions from "../App.actions"
import * as React from "react";
// import CourseDetail from "../courses/CourseDetail";
import {connect} from "react-redux";
//import CourseActions from "../actions/Course.actions";

class CoursesPage extends Component<any,any>
{

    constructor(props: any) {
        super(props);

        this.state = {

        };
    }

    public render() {
        const dummy = [
            {id:1, name: "LFTC", department: "info", isConfigured: false},
            {id:2, name: "PPD", department: "info", isConfigured: false},
            {id:3, name: "PLF", department: "info", isConfigured: true},
            {id:4, name: "Microcontrollers", department: "info", isConfigured: false},
            {id:5, name: "ASC", department: "info", isConfigured: true},
            {id:6, name: "MAP", department: "info", isConfigured: true},
        ];
        return (
            <div className="p-app">
                <Header login="none" courses="inline" students="none" catalog="none" myProfile="none"/>
                <Dashboard courseItems={dummy}/>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {

    };
};

export default connect(
    mapStateToProps,
)(CoursesPage);