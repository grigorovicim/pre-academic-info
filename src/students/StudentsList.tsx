import * as React from "react";
import {Component} from "react";


import './StudentsList.css';

import * as PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import Popup from "../commons/Popup";
import AppActions from 'src/App.actions';

class StudentsList extends Component<any, any> {
    static propTypes = {
        fetchStudents: PropTypes.func.isRequired,
        students: PropTypes.array.isRequired,
        studentProfile: PropTypes.any
    };


    constructor(props : any){
        super(props);
        this.state = {
            isPopupVisible: false,
            popupComponentType: null,
        };
        this.closePopup = this.closePopup.bind(this);
        this.openAddStudentPopup = this.openAddStudentPopup.bind(this);
        this.openAddNewStudentPopup = this.openAddNewStudentPopup.bind(this);

    }

    componentWillMount(){
    }

    closePopup() {
        this.setState({
            isPopupVisible: false,
        });
    }
    openAddStudentPopup(e: any) {
        e.stopPropagation();
        this.props.dispatch(AppActions.setIsAlert(false));
        this.props.dispatch(AppActions.setIsLarge(false));
        this.setState({
            isPopupVisible: true,
            popupComponentType: 'p-add-student-button',
        });
    }
    openAddNewStudentPopup(e: any){
        e.stopPropagation();
        this.setState({
            isPopupVisible: true,
            popupComponentType: 'p-add-new-student-button',
        });
    }

    render(){

        return(
            <div>
                <tbody className="p-students-table">
                    {/* <tr>
                        <th className="p-students-table-header">Student name</th>
                    </tr> */}
                    <tr>
                        <button className="p-add-student-to-course-btn" onClick={this.openAddStudentPopup}>Add existing student to course</button>
                        <button className="p-add-student-to-course-btn" onClick={this.openAddNewStudentPopup}>Add new student to course</button>
                    </tr>
                </tbody>
                <Popup isVisible={this.state.isPopupVisible} onClose={this.closePopup} componentType={this.state.popupComponentType} courseId={this.props.courseId}/>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
});


export default connect(mapStateToProps, )(StudentsList);