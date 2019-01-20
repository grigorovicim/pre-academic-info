import * as React from "react";
import { Component } from "react";
import searchLogo from '../images/search.png';
import StudentItem from "./StudentItem";
import { fetchStudentsEnrolled, fetchStudentsNotEnrolled,} from '../actions/Student.actions';
import { connect } from 'react-redux';
import {createStudentCourse} from "../actions/StudentCourse.actions";
import {removeStudentConfig} from "../actions/Config.actions";
import {getCourseDetails} from "../actions/Course.actions";

class AddStudent extends Component<any, any>{
    private searchKeyword: any;

    constructor(props){
        super(props);
        this.state={
        };
        this.done = this.done.bind(this);
        this.getFilteredStudents = this.getFilteredStudents.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.searchKeyword = null;
    }

    componentWillMount() {
        this.props.fetchStudentsEnrolled(this.props.courseId, this.searchKeyword);
        this.props.fetchStudentsNotEnrolled(this.props.courseId, this.searchKeyword);
    }


    addStudent(student){
        this.props.createStudentCourse({
            student_id:student.id,
            course_id:this.props.courseId
        });
        this.props.fetchStudentsEnrolled(this.props.courseId, this.searchKeyword);
        this.props.fetchStudentsNotEnrolled(this.props.courseId, this.searchKeyword);
    }

    deleteStudent(student){
        this.props.removeStudentConfig(student.id,this.props.courseId);
        this.props.fetchStudentsEnrolled(this.props.courseId, this.searchKeyword);
        this.props.fetchStudentsNotEnrolled(this.props.courseId, this.searchKeyword);
    }

    handleOnChange(event){
        this.searchKeyword = event.target.value;

        if(this.searchKeyword === '') {
            this.searchKeyword = null;
        }
    }

    getFilteredStudents(){
        console.log("Filter students by" + this.searchKeyword);
        this.props.fetchStudentsEnrolled(this.props.courseId, this.searchKeyword);
        this.props.fetchStudentsNotEnrolled(this.props.courseId, this.searchKeyword);
    }

    done(){
        this.props.callback();
    }

    render(){

        const enrolled = this.props.studentsEnrolled.map( student => {
            return(
                    <StudentItem key={student.id} student={student} courseId={3} enrolled={true} callback={this.deleteStudent}/>
            )
            }
        );
        const notEnrolled = this.props.studentsNotEnrolled.map( student => {
                return(
                    <StudentItem key={student.id} student={student} courseId={3} enrolled={false} callback={this.addStudent}/>
                )
            }
        );

        return(
            <div>
                <div className="p-header-wrapper">
                    <div className="p-course-title">
                        Design Patterns
                    </div>
                    <div className="p-course-configuration">
                        Course configuration
                    </div>
                    <div className="p-add-professor-header">
                        Add student
                    </div>
                </div>

                <div className="p-search-container">
                    <div className="p-search-professor">
                        Search student:
                    </div>
                    <div  className='p-search-bar-container'>
                        <input type="text" placeholder="Search by name" className="p-search-bar" onChange={this.handleOnChange}/>
                        <img src={searchLogo} onClick={this.getFilteredStudents} className="p-search-logo"/>
                    </div>
                </div>

                <div className="p-professors-container">
                    <div className="p-professors-list-container">
                        <table className="p-professors-table">
                            <tr>
                                <th/>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Faculty</th>
                                <th>Line</th>
                                <th>Year</th>
                                <th/>
                            </tr>
                            {enrolled}
                            {notEnrolled}
                        </table>
                    </div>
                </div>

                <div className="p-button-container">
                    <button onClick={this.done} className="p-done-button">Done</button><br/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    studentsEnrolled: state.studentcourseReducer.enrolled,
    studentsNotEnrolled: state.studentcourseReducer.notEnrolled
});


export default connect(mapStateToProps, { fetchStudentsEnrolled, fetchStudentsNotEnrolled, createStudentCourse, removeStudentConfig, getCourseDetails})(AddStudent);

