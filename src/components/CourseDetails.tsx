// @ts-ignore
import React, {Component} from 'react';
// @ts-ignore
import { connect } from 'react-redux';
import "./CourseDetails.css";
import CourseActions from 'src/actions/Course.actions';
class CourseDetails extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    if(this.props.user.userDetails == null ) {
      return;
    }
    this.props.dispatch(CourseActions.fetchItems(this.props.user.userDetails.username));
  }

  render() {
    const seminarProfs = [
      {id: 1, name: "Arthur Molnar"},
      {id: 2, name: "Gaceanu Radu"},
      {id: 1, name: "Arthur Molnar"},
      {id: 2, name: "Gaceanu Radu"},
      {id: 1, name: "Arthur Molnar"},
      {id: 2, name: "Gaceanu Radu"},
      {id: 1, name: "Arthur Molnar"},
      {id: 2, name: "Gaceanu Radu"},
      {id: 1, name: "Arthur Molnar"},
      {id: 2, name: "Gaceanu Radu"},
    ]
    const labProfs = [
      {id: 1, name: "Arthur Molnar"},
      {id: 2, name: "Gaceanu Radu"},
      {id: 1, name: "Arthur Molnar"},
    ]

    const groups = [
      {id: 933},
      {id: 935},
      {id: 936},
    ]

    const students = [
      {id: 1, name: "Gae Andrada"},
      {id: 2, name: "Grigorovici Monica"},
      {id: 3, name: "Nicole Dolot"},
      {id: 4, name: "Alexandra Dragodan"},
      {id: 5, name: "Maria Ungur"},
    ]

      return (
        <div className="p-course-details-component">
          <div className="p-title">Design Patterns</div>
          <div className="p-subtitle-specializare">informatica engleza</div>
          <div className="p-column professor">
            <div className="p-title">Professor</div>
            <div className="p-content">Molnar Arthur</div>
          </div>
          <div className="p-column description">
            <div className="p-title">Description</div>
            <div className="p-content">In software engineering, a software design pattern is a general, reusable solution to a commonly occurring problem within a given context in software design. It is not a finished design that can be transformed directly into source or machine code. It is a description or template for how to solve a problem that can be used in many different situations. Design patterns are formalized</div>
          </div>
          <div className="p-column rules">
            <div className="p-title">Rules</div>
            <div className="p-content">Minumal grade at exam is 5. In order to pass this exam each student…</div>
          </div>
          <div className="p-column labs">
            <div className="p-title">Labs</div>
            <div className="p-content">
              <div className="p-first-column">
                <div className="p-line">
                  <div className="p-title">Number:</div>
                  <div className="p-content">6</div>    
                </div>
                <div className="p-line">
                  <div className="p-title">Hours:</div>
                  <div className="p-content">2</div>
                </div>
              </div>
              <div className="p-second-colomn proffesors">
                <div className="p-title">Proffesors:</div>
                <div className="p-content professors-list">
                {
                  labProfs.map((prof: any) =>
                    <div key={prof.id}> 
                      <div className="p-list-one-proffesor"> {prof.name} </div>
                    </div>
                  )
                }
                </div>
              </div> 
            </div>
          </div>
          <div className="p-column seminars">
            <div className="p-title">Seminars</div>
            <div className="p-content">
              <div className="p-first-column">
                <div className="p-line">
                  <div className="p-title">Number:</div>
                  <div className="p-content">6</div>    
                </div>
                <div className="p-line">
                  <div className="p-title">Hours:</div>
                  <div className="p-content">2</div>
                </div>
              </div>
              <div className="p-second-colomn proffesors">
                <div className="p-title">Proffesors:</div>
                <div className="p-content professors-list">
                {
                  seminarProfs.map((prof: any) =>
                    <div key={prof.id}> 
                      <div className="p-list-one-proffesor"> {prof.name} </div>
                    </div>
                  )
                }
                </div>
              </div> 
            </div>
          </div>
          <div className="p-column groups">
            <div className="p-title">Groups</div>
            <div className="p-content">
                {
                  groups.map((group: any) =>
                    <div key={group.id}> 
                      <div className="p-list-one-group"> {group.id} </div>
                    </div>
                  )
                }
            </div>
          </div>
          <div className="p-column students">
            <div className="p-title">Students</div>
            <div className="p-content">
            {
              students.map((stud: any) =>
                <div key={stud.id}> 
                  <div className="p-list-one-student"> {stud.name} </div>
                </div>
              )
            }
            </div>
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