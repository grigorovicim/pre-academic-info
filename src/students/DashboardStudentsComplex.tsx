import * as React from "react";
import { Component } from "react";

import './DashboardStudentsComplex.css';
import DashboardStudentItemComplex from './DashboardStudentItemComplex';

class DashboardStudentsComplex extends Component<any, any>{

    private studentItems: any[];

    constructor(props: any){
        super(props);
        this.studentItems = props.studentItems;
    }

    render(){
        const studentItemComponents = this.studentItems.map(student => {
            return(
               <tr key={student.id}>
                    {/* poate ar trebui sa trimitem un student intreg aici, si abia in StudentItem sa ii despachetam proprietatile */}
                    <DashboardStudentItemComplex student = {student}/>
                </tr>
            )
        })
        return(
            <div>
                <table className="p-students-table">
                    <tr>
                        <th className="p-students-table-header">Name</th>
                        <th className="p-students-table-header">Email</th>
                        <th className="p-students-table-header">Section</th>
                        <th className="p-students-table-header">Year</th>
                    </tr>
                    {studentItemComponents}
                </table>
        </div> 
        );
    }
}
export default DashboardStudentsComplex;