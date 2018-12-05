import * as React from "react";
import { Component } from "react";

import StudentsListItem from './StudentsListItem';

import './StudentsList.css';

import * as PropTypes from 'prop-types'; 
import { connect } from 'react-redux'; 
import { fetchStudents, fetchProfileForStudent } from '../actions/Student.actions'; 

class StudentsList extends Component<any, any>{
    static propTypes = {
        fetchStudents: PropTypes.func.isRequired,
        students: PropTypes.array.isRequired,
        studentProfile: PropTypes.any
      };

<<<<<<< HEAD
=======
    private courseId = 1;
>>>>>>> Implemented config removal for professor and student

    componentWillMount(){
        /// TODO get the real id of the course from the user input
        this.props.fetchStudents(this.courseId); 
    }

    render(){
        const studentItems = this.props.students.map(student => {
           this.props.fetchProfileForStudent(student.id);
            return(
<<<<<<< HEAD
               <div key={student.id}>
                    <StudentsListItem student = {this.props.studentProfile}/>
                </div>
=======
                <tr key={student.id}>
                    <StudentsListItem student = {student} courseId = {this.courseId}/>
                </tr>
>>>>>>> Implemented config removal for professor and student
            )
        })
        return(
            <div>
                        <button>Add student +</button>
                    {studentItems}
            </div> 
        );
    }
}

const mapStateToProps = state => ({
    students: state.studentReducer.items, 
    studentProfile: state.studentReducer.studentProfile
  });


export default connect(mapStateToProps, { fetchStudents, fetchProfileForStudent })(StudentsList);