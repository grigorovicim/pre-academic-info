import {Component} from "react";
import * as React from "react";
import Header from "../commons/header/Header";
import CourseDetails from "./CourseDetails";
import DashboardStudentsComplex from "../students/DashboardStudentsComplex";
import DashboardProfessors from "../professors/DashboardProfessors";
import StudentsList from "../students/StudentsList";
import ActivityDetail from 'src/courses/ActivityDetail';

class StudentsPage extends Component<any, any> {

    public render() {
        const dummyStudents = [
            {id: 1, name: 'Nicole', email: 'ddie2108@cs.ubbcluj.ro', section: 'Info Engleza', year_of_study: 1},
            {id: 1, name: 'Bianca', email: 'diie2318@cs.ubbcluj.ro', section: 'Info Engleza', year_of_study: 2}
        ];
        const dummyProfessors = [
            {id: 1, nickname: 'Nicole', title: "prof"},
            {id: 2, nickname: 'Bianca', title: "prof"}
        ];
        const courseDetails = {
            name: "Design Patterns",
            professor: "Molnar Arthur",
            section: {name: 'English', nrGroups: 6},
            groups: [932, 933, 934, 935],
            students: [
              {
                name: "Ana Maria",
                homework: 10,
                present: true,
                totalPresents: 2,
                exam: "-" ,
                finalGrade: "-"
              },
              {
                name: "Andrada Gae",
                homework: 10,
                present: true,
                totalPresents: 2,
                exam: "-" ,
                finalGrade: "-"
              },
              {
                name: "Iuliana Florentina",
                homework: 10,
                present: true,
                totalPresents: 2,
                exam: "-" ,
                finalGrade: "-"
              },
            ]
        };
        return (
            <div>
                <Header home="none" courses="none" students="inline" catalog="none" myProfile="none"/>
                <CourseDetails/>
                <ActivityDetail details={courseDetails}/>
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