import {Component} from "react";
import Header from "../commons/header/Header";
import Dashboard from "../courses/Dashboard";
import * as React from "react";
import {connect} from "react-redux";
import UploadFile from "../upload_file/UploadFile";

class CoursesPage extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {};
        console.log(this.props.app.user);
    }

    displayUpload() {
        if(this.props.app.user.userDetails == null) {
            return (<div/>);
        }
        
        if (this.props.app.user.userDetails.role_id !== 1) {
            console.log(this.props.app.user.userDetails.role);
            return (<UploadFile/>)
        }
        return (<div/>);
    }

    public render() {
        return (
            <div className="p-app">
                <Header home="none" courses="inline" students="none" catalog="none" myProfile="none"/>
                {this.displayUpload()}
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