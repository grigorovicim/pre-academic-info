import * as React from "react";
import { Component } from "react";

import './DashboardCourseItem.css';
import plusBtn from '../plus-btn.png';
import optionsBtn from '../options-btn.png';


class DashboardCourseItem extends Component<any, any> {
    private name: any;
    private department: any;
    private isConfigured: any;

    constructor(props: any) {
        super(props);
        this.name = props.name;
        this.department = "info";
        this.isConfigured = props.isConfigured;
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
        console.log("add config");
    }

    editConfiguration() {
        console.log("edit config");
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

export default DashboardCourseItem;