import * as React from "react";
import { Component } from "react";
import searchLogo from '../images/search.png';
import StudentItem from "./StudentItem";
import { fetchStudents } from '../actions/Student.actions';
import { connect } from 'react-redux';
//import DashboardStudentItemComplex from "./DashboardStudentItemComplex";

class AddStudent extends Component<any, any>{
    private searchKeyword: any;
    private setStudentRef: any;

    constructor(props){
        super(props);
        this.state={
        };
        this.done = this.done.bind(this);
        this.getFilteredStudents = this.getFilteredStudents.bind(this);
        this.setStudentRef= (element:any) => {
            this.searchKeyword = element;
        }
    }

    componentWillMount(){
        this.props.fetchStudents(this.props.courseId);
    }

    getFilteredStudents(){
        console.log("Filter students by" + this.searchKeyword)
    }

    done(){
        this.props.callback();
    }

    render(){

        const studentRecords = this.props.students.map( student => {
            return(
                    <StudentItem key={student.id} student={student} courseId={1}/>
            )
            }
        );
        return(
            <div>
                <div className="p-header-wrapper">
                    <div className="p-course-title">
                        Design patterns
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
                    <div>
                        <input ref={this.setStudentRef} type="text" placeholder="Search by name" className="p-search-bar"/>
                        <img src={searchLogo} className="p-search-logo"/>
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
                            {studentRecords}
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
    students: state.studentReducer.items,
});


export default connect(mapStateToProps, { fetchStudents })(AddStudent);