import * as React from "react";
import { Component } from "react";

import StudentsListItem from './StudentsListItem';

import * as PropTypes from 'prop-types'; 
import { connect } from 'react-redux'; 
import { fetchStudents } from '../actions/Student.actions'; 

class StudentsList extends Component<any, any>{
    static propTypes = {
        fetchStudents: PropTypes.func.isRequired,
        students: PropTypes.array.isRequired,
      };

    componentWillMount(){
        this.props.fetchStudents(1);
        
    }

    render(){
        const studentItems = this.props.students.map(student => {
            return(
               <tr key={student.id}>
                    <StudentsListItem student = {student}/>
                </tr>
            )
        })
        return(
            <div>
                <tbody className="p-students-table">
                    <tr>
                        <th className="p-students-table-header">Student name</th>
                    </tr>
                    {studentItems}
                </tbody>
        </div> 
        );
    }
}

const mapStateToProps = state => ({
    students: state.studentReducer.items, 
  });


export default connect(mapStateToProps, { fetchStudents })(StudentsList);