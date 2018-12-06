// @ts-ignore
import React, {Component} from 'react';
// @ts-ignore
import { connect } from 'react-redux';
import "./CourseDetails.css";
class CourseDetails extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {}
  }
  render() {
      return (
        <div className="p-course-details-component">
          <div className="p-title">Design Patterns</div>
          <div className="p-subtitle-specializare">informatica engleza</div>
          <div className="p-column professor">
            <div className="p-title">Professor</div>
            <div className="p-content">blabla</div>
          </div>
          <div className="p-column description">
            <div className="p-title">Description</div>
            <div className="p-content">blabla</div>
          </div>
          <div className="p-column rules">
            <div className="p-title">Rules</div>
            <div className="p-content">blabla</div>
          </div>
          <div className="p-column labs">
            <div className="p-title">Labs</div>
            <div className="p-content">blabla</div>
          </div>
          <div className="p-column seminars">
            <div className="p-title">Seminars</div>
            <div className="p-content">blabla</div>
          </div>
          <div className="p-column groups">
            <div className="p-title">Groups</div>
            <div className="p-content">blabla</div>
          </div>
          <div className="p-column students">
            <div className="p-title">Students</div>
            <div className="p-content">blabla</div>
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
)(CourseDetails);