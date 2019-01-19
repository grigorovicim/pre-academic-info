import * as React from "react";
import {Component} from "react";

import './Dashboard.css';
import DashboardCourseItem from './DasboardCourseItem';
import AppActions from 'src/App.actions';
// import CourseDetails from 'src/components/CourseDetails';
import {connect} from 'react-redux';
import Popup from 'src/commons/Popup';
import ActivityDetail from './ActivityDetail';

class Dashboard extends Component<any, any> {

    //private courseItems: any[];

    constructor(props: any) {
        super(props);
        //this.courseItems = Array.from(props.courseItems);
        this.openCourseDetailsPopup = this.openCourseDetailsPopup.bind(this);
        this.closeCampaignPopup = this.closeCampaignPopup.bind(this);
    }

    openCourseDetailsPopup(courseId: any, courseDetails: any) {
        if (!isNaN(courseId)) {
            this.props.dispatch(AppActions.setPopupVisibility(true));
            this.props.dispatch(AppActions.setPopupContentElement(
                <ActivityDetail
                    courseDetails={courseDetails}
                    key={Date.now()}
                />
                )
            );
        }
    }

    closeCampaignPopup() {
        this.props.dispatch(AppActions.setPopupVisibility(false));
    }

    render() {
      const {
        isPopupVisible,
        courseItems,
        popupContent,
      } = this.props;
        const courseItemComponents = courseItems.map(course => {
            return (
                <div key={course.id} className="p-dashboard-item">
                    <DashboardCourseItem
                        content={course}
                        name={course.name}
                        section={course.Section.name}
                        isConfigured={course.is_active}
                        onDetails={this.openCourseDetailsPopup}
                        dashboardPage={this.props.dashboardPage}
                    >
                    </DashboardCourseItem>
                </div>)
        });
        return (
            <div className='p-dashboard'>
                <div className='p-dashboard-header row'>
                    <span className="col-md-5">Name</span>
                    <span className="col-md-3">Section</span>
                    <span className="col-md-1">Options</span>
                </div>
                <div className='p-dashboard-body'>
                    {courseItemComponents}
                </div>
                <Popup isVisible={isPopupVisible} onClose={this.closeCampaignPopup}>
                    {popupContent}
                </Popup>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        items: state.courseReducer.items,
        isPopupVisible: state.app.isPopupVisible,
        popupContent: state.app.popupContent
    };
};

export default connect(
    mapStateToProps,
)(Dashboard);