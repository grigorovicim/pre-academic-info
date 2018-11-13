import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import * as React from "react";
import {Component} from "react";
import { Glyphicon } from 'react-bootstrap';

import './DashboardCourseItem.css';


class DashboardCourseItem extends Component<any, any> {
    private name: any;
    private department: any;
    private isConfigured: any;

    constructor(props: any) {
        super(props);
        this.name = "Andrada";
        this.department = "info";
        this.isConfigured = false;
    }

    render() {
        return (
            <div className="container">
                <div className="container dashboard-course-item">
                    <div className="dashboard-course-item-text">{this.name}</div>
                    <div className="dashboard-course-item-text">{this.department}</div>
                    <div className="add-config-button-wrapper">
                        <button type="button" className=" add-config-button btn btn-info ">
                            {/*<span className="glyphicon glyphicon-plus"/>*/}
                            <Glyphicon glyph="plus"/>
                            {this.isConfigured}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardCourseItem;