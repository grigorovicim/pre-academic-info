import * as React from "react";
import { Component } from "react";

import DashboardProfessorItem from './DashboardProfessorItem';

import './ProfessorsList.css';

import * as PropTypes from 'prop-types'; 
import { connect } from 'react-redux'; 
import { fetchProfessors, fetchProfessorProfile } from '../actions/Professor.actions'; 

class DashboardProfessors extends Component<any, any>{
    static propTypes = {
        fetchProfessors: PropTypes.func.isRequired,
        professors: PropTypes.array.isRequired,
        professorProfile: PropTypes.any
      };
    
    /// TODO get the actual course id from the user input
    private courseId = 1;

    componentWillMount(){
        this.props.fetchProfessors(this.courseId);
        console.log("prof comp mounted");
    }

    render(){
        const professorItemComponents = this.props.professors.map(professor => {
            this.props.fetchProfessorProfile(professor.id);
            return(
               <tr key={professor.id}>
<<<<<<< HEAD
                    <DashboardProfessorItem professor = {this.props.professorProfile}/>
=======
                    <DashboardProfessorItem professor = {professor} courseId = {this.courseId}/>
>>>>>>> Implemented config removal for professor and student
                </tr>
            )
        })
        return(
            <div>
                {/* <table className="p-professors-basic-table"> */}
                    {/* <tr> */}
                        {/* <button className="p-add-prof-button">Add professor +</button> */}
                    {/* </tr> */}
                    {/* <tr>
                        <th className="p-professors-basic-table-header">ProfessorName</th>
                    </tr> */}
                    {professorItemComponents}
                {/* </table> */}
        </div> 
        );
    }
}

const mapStateToProps = state => ({
    professors: state.professorReducer.items, 
<<<<<<< HEAD
    professorProfile: state.professorReducer.professorProfile
  });
=======
});
>>>>>>> Implemented config removal for professor and student


export default connect(mapStateToProps, { fetchProfessors, fetchProfessorProfile })(DashboardProfessors);