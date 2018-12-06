import * as React from "react";

import './DashboardStudentsComplex.css';

const DashboardStudentItemComplex = (props: any) => {

    const name = props.student.name;
    const email = props.student.email;
    const section = props.student.section;
    const year = props.student.year_of_study;

        return(
        //   <div className="container">

            <tr>
                <td >{name}</td>
                <td >{email}</td>
                <td >{section}</td>
                <td >{year}</td>
            </tr>
        //   </div>  
        );
}

export default DashboardStudentItemComplex;
