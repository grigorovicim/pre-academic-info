import {Component} from "react";
import Header from "../commons/header/Header";
import Dashboard from "../courses/Dashboard";
// import AppActions from "../App.actions"
import * as React from "react";
// import CourseDetail from "../courses/CourseDetail";
import {connect} from "react-redux";
import UploadFile from "../upload_file/UploadFile";
//import CourseActions from "../actions/Course.actions";
//import CourseActions from "../actions/Course.actions";

class CoursesPage extends Component<any,any>
{

    constructor(props: any) {
        super(props);

        this.state = {
        };
        console.log(this.props.app.user);

        //this.props.dispatch(CourseActions.fetchItems(this.props.app.user.userDetails.username))
    }

    public render() {
        return (
            <div className="p-app">

                <Header home="none" courses="inline" students="none" catalog="none" myProfile="none"/>

                <UploadFile/>

                <Dashboard courseItems={this.props.items} dashboardPage="courses"/>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        items: state.courseReducer.items,
        app: Object.assign({}, state.app),
    };
};

export default connect(
    mapStateToProps,
)(CoursesPage);