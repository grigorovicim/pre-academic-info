// @ts-ignore
import React, {Component} from 'react';

import './Popup.css';
import { connect } from 'react-redux';
import Login from 'src/authentication/Login';
import RegisterFeedback from "../authentication/RegisterFeedback";
import AddProf from "../professors/AddProf";
import AddStudent from "../students/AddStudent";
import AddNewStudentToCourse from "../students/AddNewStudentToCourse";
import Tests from 'src/courses/popups/Tests';
import ActivityDetail from "../courses/ActivityDetail";
import CourseDetails from "../components/CourseDetails";

class Popup extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: any) {
    this.props.onClose();
  }

  render() {

    const {
      isVisible,
      // popupContent,
    } = this.props;

    let display;
    let setWidth = "640px";
    let setHeight = "650px";

    if (isVisible) {
      display = 'flex';
    } else {
      display = 'none';
    }

    if(this.props.isAlert) {
      setWidth = "640px";
      setHeight = "220px";
    }

    let component;
    if (this.props.children) {
      component = this.props.children;
    }


    if (this.props.componentType === "home") {
      return null;
    } else if (this.props.componentType === "p-login-whichButton") {
      component = <Login/>
    } else if (this.props.componentType === "p-register-feedbackButton"){
      component = <RegisterFeedback/>
    } else if (this.props.componentType === "p-add-professor-button"){
      component = <AddProf courseId={this.props.courseId} callback={this.handleClick}/>
    }  else if (this.props.componentType === "p-add-student-button"){
        component = <AddStudent courseId={this.props.courseId} callback={this.handleClick}/>
    }  else if (this.props.componentType === "p-courses-detail-button"){
        component = <CourseDetails />
    }  else if (this.props.componentType === "p-activity-detail-button"){
        component = <ActivityDetail details={this.props.courseDetails} />
    } else if ( this.props.componentType === "p-add-new-student-button"){
        component = <AddNewStudentToCourse courseId={this.props.courseId} callback={this.handleClick}/>
    } else if (this.props.componentType === "p-lab-tests"){
      component = <Tests sendToParent = {this.props.sendToParent} tests={this.props.tests} percentages={this.props.percentages} type={"lab"}/>
    }
    else if (this.props.componentType === "p-seminar-tests"){
      component = <Tests  sendToParent = {this.props.sendToParent} tests={this.props.tests} percentages={this.props.percentages} type={"seminar"}/>
    }else if (this.props.componentType === "p-course-tests"){
      component = <Tests  sendToParent = {this.props.sendToParent} tests={this.props.tests} percentages={this.props.percentages} type={"course"}/>
    } else{
      component = <span/>;
    }

    return (
      <div className="p-popup" style={{display}} onClick={this.handleClick}>
        <div className="p-popup-core" style={{width: setWidth, height: setHeight}} onClick={e => {e.stopPropagation()}}>
          <div className="p-close-button" onClick={this.handleClick}> X </div>
          {component}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isPopupVisible: state.app.isPopupVisible,
    popupContent: state.app.popupContent,
    isAlert: state.app.isAlert,
  };
};

export default connect(
  mapStateToProps,
)(Popup);