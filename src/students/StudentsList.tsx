import * as React from "react";
import { Component } from "react";

import StudentsListItem from './StudentsListItem';

import './StudentsList.css';

import * as PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { fetchStudents, fetchProfileForStudent } from '../actions/Student.actions';
import Popup from "../commons/Popup";

class StudentsList extends Component<any, any>{
    static propTypes = {
        fetchStudents: PropTypes.func.isRequired,
        students: PropTypes.array.isRequired,
        studentProfile: PropTypes.any
    };

    /// TODO get the real id of the course from the user input
    private courseId = 1;

    constructor(props){
        super(props);
        this.state = {
            isPopupVisible: false,
            popupComponentType: null,
        }
        this.closePopup = this.closePopup.bind(this);
        this.openAddStudentPopup = this.openAddStudentPopup.bind(this);
    }

    componentWillMount(){
        this.props.fetchStudents(this.courseId); 
    }

    closePopup() {
        this.setState({
            isPopupVisible: false,
        });
    }
    openAddStudentPopup(e: any) {
        e.stopPropagation();
        this.setState({
            isPopupVisible: true,
            popupComponentType: 'p-add-student-button',
        });
    }

    render(){
        const studentItems = this.props.students.map(student => {
            this.props.fetchProfileForStudent(student.id);
            return(
                <div key={student.id}>
                    <StudentsListItem student = {this.props.studentProfile} courseId = {this.courseId} studentId = {student.id}/>
                </div>
            );
        })
        return(
            <div>
                <tbody className="p-students-table">
                    {/* <tr>
                        <th className="p-students-table-header">Student name</th>
                    </tr> */}
                    <tr>
                        <button onClick={this.openAddStudentPopup}>Add student</button>
                    </tr>
                    {studentItems}
                </tbody>
                <Popup isVisible={this.state.isPopupVisible} onClose={this.closePopup} componentType={this.state.popupComponentType} courseId={1}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    students: state.studentReducer.items, 
    studentProfile: state.studentReducer.studentProfile
});


export default connect(mapStateToProps, { fetchStudents, fetchProfileForStudent })(StudentsList);