import * as React from "react";
import { Component } from "react";

import './DashboardCourseItem.css';
import plusBtn from '../plus-btn.png';

import optionsBtn from '../options-btn.png';
import AppActions from "../App.actions";
import CourseDetail from "./CourseDetail";
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
        const detail = {
            name: "Design Patterns",
            number: 14,
            hours: 2,
            professor: "Molnar Arthur",
            section: {name: 'English', nrGroups: 6},//nrGroups not in db
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            rules: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            labs: {
                number: 7,
                hours: 2,
                practicals: 2,
                professors: [{id: 1, name: "Molnar Arthur"}, {id: 2, name: "Cretu Maria"}]
            },
            seminars: {number: 14, hours: 2, partials: 2, professors: {id: 1, name: "Molnar Arthur"}},
            groups: [932, 933, 934, 935],
            students: [{id: 1, name: "Antonesei Andrada"}, {id: 2, name: "Amariei Iuliana"}, {
                id: 3,
                name: "Blanariu Mihai"
            }]
        };

        this.props.dispatch(AppActions.setPopupContentElement(
            <CourseDetail detail={detail}/>
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