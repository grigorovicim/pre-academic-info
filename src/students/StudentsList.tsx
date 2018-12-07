import * as React from "react";
import {Component} from "react";

import StudentsListItem from './StudentsListItem';

import './StudentsList.css';

import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchStudents, fetchProfileForStudent} from '../actions/Student.actions';

class StudentsList extends Component<any, any> {
    static propTypes = {
        fetchStudents: PropTypes.func.isRequired,
        students: PropTypes.array.isRequired,
        studentProfile: PropTypes.any
    };

    /// TODO get the real id of the course from the user input
    private courseId = 1;

    componentWillMount() {
        this.props.fetchStudents(this.courseId);
    }

    render() {
        const studentItems = this.props.students.map((student: any) => {
            this.props.fetchProfileForStudent(student.id);
            return (
                <div key={student.id}>
                    <StudentsListItem student={this.props.studentProfile} courseId={this.courseId}
                                      studentId={student.id}/>
                </div>
            );
        })
        return (
            <div>
                <button>Add student +</button>
                {studentItems}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    students: state.studentReducer.items,
    studentProfile: state.studentReducer.studentProfile
});


export default connect(mapStateToProps, {fetchStudents, fetchProfileForStudent})(StudentsList);