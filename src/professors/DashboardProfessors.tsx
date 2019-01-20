import * as React from "react";
import {Component} from "react";

import './ProfessorsList.css';

import * as PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import Popup from "../commons/Popup";
import AppActions from 'src/App.actions';

class DashboardProfessors extends Component<any, any> {
    static propTypes = {
        fetchProfessors: PropTypes.func.isRequired,
        professors: PropTypes.array.isRequired,
        professorProfile: PropTypes.any
    };


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

        this.props.dispatch(AppActions.setIsAlert(false));
        this.props.dispatch(AppActions.setIsLarge(false));
        this.setState({
            isPopupVisible: true,
            popupComponentType: 'p-add-professor-button',
        });
    }

    componentWillMount(){
    }

    render() {
        return(
            <div>
                <table className="student-title">
                    <tr>
                        <button className="p-add-professor-to-course-btn" onClick={this.openAddProfessorPopup}>Add professor</button>
                    </tr>
                </table>
                <Popup isVisible={this.state.isPopupVisible} onClose={this.closePopup} componentType={this.state.popupComponentType} courseId={this.props.courseId}/>
        </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
});



export default connect(mapStateToProps, )(DashboardProfessors);
