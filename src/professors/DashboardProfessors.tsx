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

    componentWillMount(){
        /// TODO get the actual course id from the user input
        this.props.fetchProfessors(1);
        console.log("prof comp mounted");
    }

    render(){
        const professorItemComponents = this.props.professors.map(professor => {
            this.props.fetchProfessorProfile(professor.id);
            return(
               <tr key={professor.id}>
                    <DashboardProfessorItem professor = {this.props.professorProfile}/>
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
    professorProfile: state.professorReducer.professorProfile
  });


export default connect(mapStateToProps, { fetchProfessors, fetchProfessorProfile })(DashboardProfessors);