import * as React from "react";
import {Component} from "react";

import DashboardProfessorItem from './DashboardProfessorItem';

import './ProfessorsList.css';

<<<<<<< HEAD
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchProfessors, fetchProfessorProfile} from '../actions/Professor.actions';
=======
import * as PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { fetchProfessors, fetchProfessorProfile } from '../actions/Professor.actions';
import Popup from "../commons/Popup";
>>>>>>> develop

class DashboardProfessors extends Component<any, any> {
    static propTypes = {
        fetchProfessors: PropTypes.func.isRequired,
        professors: PropTypes.array.isRequired,
        professorProfile: PropTypes.any
    };

    /// TODO get the actual course id from the user input
    private courseId = 1;

<<<<<<< HEAD
    componentWillMount() {
=======
    constructor(props: any) {
        super(props);
        this.openAddProfessorPopup = this.openAddProfessorPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.state = {
            isPopupVisible: false,
            popupComponentType: null,
        }
    }


    closePopup() {
        this.setState({
            isPopupVisible: false,
        });
    }
    openAddProfessorPopup(e: any) {
        e.stopPropagation();
        this.setState({
            isPopupVisible: true,
            popupComponentType: 'p-add-professor-button',
        });
    }

    componentWillMount(){
>>>>>>> develop
        this.props.fetchProfessors(this.courseId);
    }

    render() {
        const professorItemComponents = this.props.professors.map((professor: any) => {
            this.props.fetchProfessorProfile(professor.id);
            return (
                <tr key={professor.id}>
                    <DashboardProfessorItem professor={this.props.professorProfile} courseId={this.courseId}
                                            professorId={professor.id}/>
                </tr>
            )
<<<<<<< HEAD
        })
        return (
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
=======
        });
        return(
            <div>
                <table className="p-professors-basic-table">
                    <tr>
                        <button className="p-add-prof-button" onClick={this.openAddProfessorPopup}>Add professor</button>
                    </tr>
                    <tr>
                        <th className="p-professors-basic-table-header">ProfessorName</th>
                    </tr>
                    {professorItemComponents}
                </table>
                <Popup isVisible={this.state.isPopupVisible} onClose={this.closePopup} componentType={this.state.popupComponentType} courseId={1}/>
        </div>
>>>>>>> develop
        );
    }
}

const mapStateToProps = (state: any) => ({
    professors: state.professorReducer.items,
    professorProfile: state.professorReducer.professorProfile
});


<<<<<<< HEAD
export default connect(mapStateToProps, {fetchProfessors, fetchProfessorProfile})(DashboardProfessors);
=======

export default connect(mapStateToProps, { fetchProfessors, fetchProfessorProfile })(DashboardProfessors);
>>>>>>> develop
