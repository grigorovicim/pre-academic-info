import * as React from "react";
import {Component} from "react";

import './DashboardCourseItem.css';
import plusBtn from '../plus-btn.png';

import optionsBtn from '../options-btn.png';
import {connect} from "react-redux";
import Popup from "../commons/Popup";

class DashboardCourseItem extends Component<any, any> {
    private name: any;
    private section: any;
    private isConfigured: any;

    private courseDetails = {
            name: "Design Patterns",
            professor: "Molnar Arthur",
            section: {name: 'English', nrGroups: 6},
            groups: [932, 933, 934, 935],
            students: [
              {
                name: "Ana Maria",
                homework: 10,
                present: true,
                totalPresents: 2,
                exam: "-" ,
                finalGrade: "-"
              },
              {
                name: "Andrada Gae",
                homework: 10,
                present: true,
                totalPresents: 2,
                exam: "-" ,
                finalGrade: "-"
              },
              {
                name: "Iuliana Florentina",
                homework: 10,
                present: true,
                totalPresents: 2,
                exam: "-" ,
                finalGrade: "-"
              },
            ]
        };

    constructor(props: any) {
        super(props);
        this.name = props.name;
        this.section = props.section;
        this.isConfigured = props.isConfigured;
        this.state = {
            isPopupVisible: false,
            popupComponentType: null,
        }

        this.addDetailsPopup = this.addDetailsPopup.bind(this);
        this.openDetailsPopup = this.openDetailsPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.whichButton = this.whichButton.bind(this)
    }

    whichButton() {
        if (this.isConfigured) {
            return (<button className="course-config-button-wrapper" onClick={this.addDetailsPopup}><img
                className="course-config-button" src={optionsBtn}/></button>)
        }
        return (<button className="course-config-button-wrapper" onClick={this.openDetailsPopup}><img
            className="course-config-button" src={plusBtn}/>
        </button>)
    }

    addDetailsPopup(e: any) {
        e.stopPropagation();
        const popupComponentType = this.props.dashboardPage === 'courses' ? 'p-courses-detail-button' : 'p-activity-detail-button';
        this.setState({
            isPopupVisible: true,
            popupComponentType: popupComponentType,
        });
    }

    openDetailsPopup(e: any) {
        e.stopPropagation();
        const popupComponentType = this.props.dashboardPage === 'courses' ? 'p-courses-detail-button' : 'p-activity-detail-button';
        this.setState({
            isPopupVisible: true,
            popupComponentType: popupComponentType,
        });
    }

    closePopup() {
        this.setState({
            isPopupVisible: false,
        });
    }

    render() {
        return (
            <div className="dashboard-course-item row">
                <div className="dashboard-course-item-text col-md-5">{this.name}</div>
                <div className="dashboard-course-item-text col-md-3">{this.section}</div>
                <div className="div-config-button-wrapper col-md-1">
                    {this.whichButton()}
                </div>
                <Popup isVisible={this.state.isPopupVisible} onClose={this.closePopup} componentType={this.state.popupComponentType} courseId={1} courseDetails={this.courseDetails}/>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {};
};


export default connect(
    mapStateToProps,
)(DashboardCourseItem);