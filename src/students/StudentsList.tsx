import * as React from "react";
import { Component } from "react";

import StudentsListItem from './StudentsListItem';

import './StudentsList.css';

import * as PropTypes from 'prop-types'; 
import { connect } from 'react-redux'; 
import { fetchStudents } from '../actions/Student.actions'; 
import { fetchProfileForStudent} from '../actions/Student.actions'; 

class StudentsList extends Component<any, any>{
    static propTypes = {
        fetchStudents: PropTypes.func.isRequired,
        students: PropTypes.array.isRequired,
        studentProfile: PropTypes.any
      };


    componentWillMount(){
        /// TODO get the real id of the course from the user input
        this.props.fetchStudents(1); 
        //this.props.fetchProfileForStudent(1);
    }

    render(){
        const studentItems = this.props.students.map(student => {
           this.props.fetchProfileForStudent(student.id);
            // console.log(this.props.studentProfile)
            return(
               <div key={student.id}>
                    <StudentsListItem student = {this.props.studentProfile}/>
                </div>
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