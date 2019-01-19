import * as React from "react";
import { Component } from "react";
import './ActivityDetail.css';
import { Grid, Row, Col, ButtonToolbar, Table } from 'react-bootstrap';
import { connect } from "react-redux";

class ActivityDetail extends Component<any, any> {
    private details: any;
    private week: any;
    private setWeekRef: any;

    //private course: any;
    private groups = [931, 932, 933, 934, 935, 936];


    constructor(props: any) {
        super(props);
        this.details = props.details;
        this.week = 1;
        this.renderGroups = this.renderGroups.bind(this);

        this.state = {
            selectedGroups: [],
        };

        this.setWeekRef = (element: any) => {
            this.week = element;
        };

    }

    assignGroupToCourse = (event: any) => {
    };

    insertblabla() {
        this.week = this.week.value;
    }

    renderGroups() {
        const buttons: any = [];
        this.groups.forEach(group => {
            buttons.push(
                <button className="p-group-button" onClick={this.assignGroupToCourse}>{group}</button>
            )
        })
        return (
            <ButtonToolbar className="p-group-buttons">{buttons}</ButtonToolbar>
        );
    }

    render() {
        console.log(this.props)
        const listStudents = [];
        return (
            <Grid className="p-add-activity-popup">
                <hr />
                <h1 className="p-title-add-activity-popup" style={{ fontWeight: 600 }}>{this.details.name}</h1>
                <Row className="show-grid text-center" >
                    <Col className="center-block" style={{ fontSize: '1.25em' }} md={12}>
                        {this.renderGroups()}
                    </Col>
                </Row>
                <br></br>
                <Row className="show-grid text-center" >
                    <Col md={3}></Col>
                    <Col md={6}>
                        <ButtonToolbar>
                            <button className="p-seminar-or-lab-button" onClick={this.assignGroupToCourse}>Courses</button>
                            <button className="p-seminar-or-lab-button" onClick={this.assignGroupToCourse}>Seminars</button>
                            <button className="p-seminar-or-lab-button" onClick={this.assignGroupToCourse}>Labs</button>
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
                            ref={this.setWeekRef} /></Col>

                    </Row>
                </Row>
                <br />
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
                        <Col><input className="p-search-students-input" type='text' defaultValue={""} size={34}
                            ref={this.setWeekRef} /></Col>
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
                            <th className="p-header-add-activity">Final gradeeee</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            listStudents.map((student: any) =>
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