import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import * as React from "react";
import {Component} from "react";

import './DashboardCourseItem.css';
import plusBtn from '../plus-btn.png';
import editBtn from '../edit-btn.png';


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

    button() {
        if (this.isConfigured) {
            return <img className="course-config-button" src={editBtn}/>
        }
        return <img className="course-config-button" src={plusBtn}/>
    }

    render() {
        return (
            <div className="container">
                <div className="container dashboard-course-item">
                    <div className="dashboard-course-item-text">{this.name}</div>
                    <div className="dashboard-course-item-text">{this.department}</div>
                    <div className="div-config-button-wrapper">
                        <button className="course-config-button-wrapper">{this.button()}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardCourseItem;