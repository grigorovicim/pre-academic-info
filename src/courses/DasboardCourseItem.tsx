import * as React from "react";
import { Component } from "react";

import './DashboardCourseItem.css';
import plusBtn from '../plus-btn.png';

import optionsBtn from '../options-btn.png';
import AppActions from "../App.actions";
import ActivityDetail from "./ActivityDetail";
import {connect} from "react-redux";



class DashboardCourseItem extends Component<any, any> {
    private name: any;
    private department: any;
    private isConfigured: any;

    constructor(props: any) {
        super(props);
        this.name = props.name;
        this.department = "info";
        this.isConfigured = props.isConfigured;

        this.editConfiguration = this.editConfiguration.bind(this);
        this.addConfiguration = this.addConfiguration.bind(this);
        this.whichButton = this.whichButton.bind(this)
    }

    whichButton() {
        if (this.isConfigured) {
            return (<button className="course-config-button-wrapper" onClick={this.editConfiguration}><img
                className="course-config-button" src={optionsBtn} /></button>)
        }
        return (<button className="course-config-button-wrapper" onClick={this.addConfiguration}><img className="course-config-button" src={plusBtn} />
        </button>)
    }

    addConfiguration() {
        const details = {
            name: "Design Patterns",
            professor: "Molnar Arthur",
            section: {name: 'English', nrGroups: 6},
            groups: [932, 933, 934, 935],
            students: [{id: 1, name: "Antonesei Andrada"}, {id: 2, name: "Amariei Iuliana"}, {
                id: 3,
                name: "Blanariu Mihai"
            }]
        };

        this.props.dispatch(AppActions.setPopupContentElement(
            <ActivityDetail details={details}/>
        ));
        this.props.dispatch(AppActions.setPopupVisibility(true));    }

    editConfiguration() {
    }

    render() {
        return (
            <div className="dashboard-course-item row">
                <div className="dashboard-course-item-text col-md-5">{this.name}</div>
                <div className="dashboard-course-item-text col-md-3">{this.department}</div>
                <div className="dashboard-course-item-text col-md-3">{this.department}</div>
                <div className="div-config-button-wrapper col-md-1">
                    {this.whichButton()}
                </div>
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
)(DashboardCourseItem);