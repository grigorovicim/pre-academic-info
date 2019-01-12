import {Component} from "react";
import * as React from "react";
import Header from "../commons/header/Header";
import DashboardStudentsComplex from "../students/DashboardStudentsComplex";
import DashboardProfessors from "../professors/DashboardProfessors";
import StudentsList from "../students/StudentsList";

class StudentsPage extends Component<any,any>{

    public render (){
        const dummyStudents = [
            {id:1, name:'Nicole', email:'ddie2108@cs.ubbcluj.ro', section:'Info Engleza', year_of_study:1},
            {id:1, name:'Bianca', email:'diie2318@cs.ubbcluj.ro', section:'Info Engleza', year_of_study:2}
        ];
        const dummyProfessors = [
            {id:1, nickname:'Nicole', title:"prof"},
            {id:2, nickname:'Bianca', title:"prof"}
        ];
        return (
            <div>
                <Header home="none" courses="none" students="inline" catalog="none" myProfile="none"/>
                <h1>Students Page</h1>
                <div className="p-app">
                    <DashboardStudentsComplex studentItems={dummyStudents}/>
                    <DashboardProfessors professors={dummyProfessors}/>
                    <StudentsList/>
                </div>
            </div>
        );
    }
}

export default StudentsPage;