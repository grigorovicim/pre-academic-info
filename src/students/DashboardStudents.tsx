import * as React from "react";
import { Component } from "react";

import './DashboardStudents.css';
import DashboardStudentItem from './DashboardStudentItem';

class DashboardStudents extends Component<any, any>{

    private studentItems: any[];

    constructor(props: any){
        super(props);
        this.studentItems = props.studentItems;
    }

    render(){
        const studentItemComponents = this.studentItems.map(student => {
            return(
                <div key={student.id}>
                    <DashboardStudentItem name={ student.id }>
                    </DashboardStudentItem>
                </div>
            )
        })
        return(
            <div>
            <div className='p-dashboard-header row'>
                <span className="col-md-3">Name</span>
                <span className="col-md-3">ID</span>
                <span className="col-md-3">Group</span>
                <span className="col-md-3">Section</span>
            </div>
            <div>
                {studentItemComponents}
            </div>
        </div> 
        );
    }
}
export default DashboardStudents;