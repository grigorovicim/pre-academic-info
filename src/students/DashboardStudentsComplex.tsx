import * as React from "react";
import { Component } from "react";

import './DashboardStudentsComplex.css';
import DashboardStudentItemComplex from './DashboardStudentItemComplex';

import * as PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchStudents } from '../actions/Student.actions';

class DashboardStudentsComplex extends Component<any, any>{
    static propTypes = {
        fetchStudents: PropTypes.func.isRequired,
        students: PropTypes.array.isRequired,
      };

    componentWillMount(){
        this.props.fetchStudents(2);
    }

    render(){
        const studentItemComponents = this.props.students.map(student => {
            return(
               <tr key={student.id}>
                    {/* poate ar trebui sa trimitem un student intreg aici, si abia in StudentItem sa ii despachetam proprietatile */}
                    <DashboardStudentItemComplex student = {student}/>
                </tr>
            )
        })
        return(
            <div>
                <table className="p-students-table">
                    <tr>
                        <th className="p-students-table-header">Name</th>
                        <th className="p-students-table-header">Email</th>
                        <th className="p-students-table-header">Section</th>
                        <th className="p-students-table-header">Year</th>
                    </tr>
                    {studentItemComponents}
                </table>
        </div> 
        );
    }
}

const mapStateToProps = state => ({
    students: state.studentReducer.items,
  });


// export default DashboardStudentsComplex;


export default connect(mapStateToProps, { fetchStudents })(DashboardStudentsComplex);