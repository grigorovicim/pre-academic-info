import * as React from "react";
import { Component } from "react";
import axios from "axios";
import './DashboardCourseItem.css';
import plusBtn from '../plus-btn.png';
import optionsBtn from '../options-btn.png';
import CourseActions from 'src/actions/Course.actions';
import { connect } from 'react-redux';
import AppActions from '../App.actions';


class DashboardCourseItem extends Component<any, any> {
    private name: any;
    private department: any;
    private isConfigured: any;

    constructor(props: any) {
        super(props);
        this.name = props.name;
        this.department = "info";
        this.isConfigured = props.isConfigured;
        this.handleCourseDetailsClick = this.handleCourseDetailsClick.bind(this);
    }

    whichButton() {
        if (this.isConfigured) {
            return (<button className="course-config-button-wrapper" onClick={this.handleCourseDetailsClick}>
            <img className="course-config-button" src={optionsBtn} />
            </button>)
        }
        return (<button className="course-config-button-wrapper" onClick={this.addConfiguration}><img className="course-config-button" src={plusBtn} />
        </button>)
    }

    addConfiguration() {
        console.log("add config");
    }

    editConfiguration() {
        
    }

    handleCourseDetailsClick(e: any) {
      e.stopPropagation();
      this.props.dispatch(AppActions.setIsAlert(true));
      axios.post('/details-of-course', {courseId: this.props.content.id})
      .then((response) => {
        const courseDetails = response.data;
        const courseId = this.props.content.id;
        this.props.dispatch(CourseActions.setIdOfCurrentCourse(courseId));
        this.props.onDetails(courseId, courseDetails);
      });
    }

    render() {
        return (
            <div className="dashboard-course-item row">
                <div className="dashboard-course-item-text col-md-5">{this.name}</div>
                <div className="dashboard-course-item-text col-md-3">{this.department}</div>
                <div className="dashboard-course-item-text col-md-3">{this.department}</div>
                <div className="div-config-button-wrapper col-md-1">
                    {this.whichButton()}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
  return {
  };
};

export default connect(
  mapStateToProps,
)(DashboardCourseItem);