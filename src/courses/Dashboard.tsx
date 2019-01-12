import * as React from "react";
import { Component } from "react";

import './Dashboard.css';
import DashboardCourseItem from './DasboardCourseItem';

class Dashboard extends Component<any, any> {

    private courseItems: any[];

    constructor(props: any) {
        super(props);
        this.courseItems = props.courseItems;
    }

    render() {
        const courseItemComponents = this.courseItems.map(course => {
            return (
                <div key={course.id} className="p-dashboard-item">
                    <DashboardCourseItem name={course.name} isConfigured={course.isConfigured}></DashboardCourseItem>
                </div>)
        })
        return (
            <div className='p-dashboard'>
                <div className='p-dashboard-header row'>
                    <span className="col-md-5">Name</span>
                    <span className="col-md-3">Department</span>
                    <span className="col-md-3">Availability</span>
                    <span className="col-md-1">Options</span>
                </div>
                <div className='p-dashboard-body'>
                    {courseItemComponents}
                </div>
            </div>
        );
    }
}

export default Dashboard;