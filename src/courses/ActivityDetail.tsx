import * as React from "react";
import {Component} from "react";

import './ActivityDetail.css';

import {Grid, Row, Col, ButtonToolbar, Table} from 'react-bootstrap';
import {connect} from "react-redux";
//import axios from "axios";
//import {CREATE_FORM_OF_EVALUATION} from "../actions/types";

class ActivityDetail extends Component<any, any> {
    private details: any;
    private week: any;
    private setWeekRef: any;

    constructor(props: any) {
        super(props);
        this.details = props.details;
        this.week = null;
        this.renderGroups = this.renderGroups.bind(this);
        console.log(this.details);

        this.state = {
            selectedGroups: [],
        };

        this.setWeekRef = (element: any) => {
          this.week = element;
      };

    }

    assignGroupToCourse = (event: any) => {
        console.log(event)
    };

    insertblabla(){
      this.week = this.week.value;
    }

    renderGroups() {
        //assume a course is assigned to a year of study (as in the db)
        let year = -1;
        if (this.details.groups !== undefined && this.details.groups !== []) {
            year = Math.trunc(this.details.groups[0] / 10) % 10;
        }
        if (year === -1) {
            return (<p>The year is not valid</p>);
        }
        const groups : string[] = [];
        switch (this.details.section.name) {
            case 'Romanian':
                for (let i = 1; i < this.details.section.nrGroups; i++) {
                    groups.push('2' + year.toString() + i.toString())
                }
                break;

            case 'English':
                console.log(this.details.section.nrGroups);
                for (let i = 1; i <= this.details.section.nrGroups; i++) {

                    console.log('9' + year.toString() + i.toString());
                    groups.push('9' + year.toString() + i.toString());
                    console.log('english')
                }
                break;
            case 'Hungarian':
                for (let i = 1; i <= this.details.section.nrGroups; i++) {
                    groups.push('5' + year.toString() + i.toString())

                }
                break;
            case 'German':
                for (let i = 1; i < this.details.section.nrGroups; i++) {
                    groups.push('7' + year.toString() + i.toString())
                }
                break;
        }
        const buttons: any = [];

        groups.forEach(element => {
            if (this.details.groups.indexOf(parseInt(element, 10)) > -1) {
                buttons.push(
                    <button className="p-group-button" onClick={this.assignGroupToCourse}>{element}</button>
                )
            } else {
                buttons.push(
                    <button className="p-group-button" onClick={this.assignGroupToCourse}>{element}</button>
                )
            }
        });

        return (
            <ButtonToolbar className="p-group-buttons">{buttons}</ButtonToolbar>
        );
    }

    render() {
      const listStudents = this.details.students;
        return (
            <Grid className="p-add-activity-popup">
                <hr/>
                <h1 className="p-title-add-activity-popup" style={{fontWeight: 600}}>{this.details.name}</h1>
                <Row className="show-grid text-center" >
                     <Col className="center-block" style={{fontSize: '1.25em'}} md={12}>
                         {this.renderGroups()}
                     </Col>
                </Row>
                <br></br>
                <Row className="show-grid text-center" >
                    <Col md={3}></Col>
                    <Col md={6}>
                      <ButtonToolbar>
                        <button className="p-seminar-or-lab-button"onClick={this.assignGroupToCourse}>Courses</button>
                        <button className="p-seminar-or-lab-button" onClick={this.assignGroupToCourse}>Seminars</button>
                        <button className="p-seminar-or-lab-button"onClick={this.assignGroupToCourse}>Labs</button>
                      </ButtonToolbar>
                    </Col>
                    <Col md={3}></Col>
                <br></br>
                </Row>
                <br></br>
                <Row className="show-grid text-center" >
                    <Col md={5}></Col>
                    <Row >
                            <Col className="p-week-label-input"> Week:</Col>
                            <Col ><input className="p-week-input" type='text' defaultValue={"1-14"} size={2}
                                               ref={this.setWeekRef}/></Col>

                    </Row>
                </Row>
                <br/>
                <Row className="show-grid text-center" >
                    <Col md={3}></Col>
                    <Col md={6}>
                    <button className="p-done-button-add-activity">Done</button>
                    </Col>
                    <Col md={3}></Col>
                <br></br>
                </Row>
                <br></br>
                <Row className="text-center" >
                  <Col md={1}></Col>
                    <Row >
                        <Col className="p-search-students-label-input">Search student: </Col>
                        <Col><input className="p-search-students-input" type='text' defaultValue={""} size = {34}
                                               ref={this.setWeekRef}/></Col>
                    </Row>
                    <Col md={1}></Col>
                </Row>
                <br></br>
                <Table striped bordered condensed hover>
                   <thead>
                    <tr>
                      <th className="p-header-add-activity">NAME</th>
                      <th className="p-input-homework-header">Homework</th>
                      <th className="p-input-presents-header">Present</th>
                      <th className="p-header-add-activity">Total presents</th>
                      <th className="p-header-add-activity">Exam</th>
                      <th className="p-header-add-activity">Final grade</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    
                      {
                        listStudents.map((student : any) => 
                          // tslint:disable-next-line:jsx-key
                          <tr>

                              <td className="p-input-student"><div className="p-photo-student"></div>{student.name}</td>
                              <td><input className="p-input-homework-student" placeholder={student.homework}></input></td>
                              <td><input className="p-input-present-student" placeholder={student.present}></input></td>
                              <td className="p-input-student">{student.totalPresents}</td>
                              <td className="p-input-student">{student.exam}</td>
                              <td className="p-input-student">{student.finalGrade}</td>
                              <td className="p-input-student"><button className="p-save-student-activity">Save</button></td>
                          </tr> 
                      )
                    }

                    </tbody>
                  </Table>
            </Grid>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        items: state.formOfEvaluationReducer.items,
        formOfEvaluation: state.courseReducer.formOfEvaluation,
    };
};

export default connect(
    mapStateToProps,
)(ActivityDetail);