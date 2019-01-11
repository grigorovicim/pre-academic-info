import * as React from "react";
import {Component} from "react";

import './ActivityDetail.css';

import {Grid, Row, Col, Button, ButtonToolbar, Table} from 'react-bootstrap';
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
        const groups = [];
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
                    <Button onClick={this.assignGroupToCourse}  bsStyle="primary">&nbsp;{element}&nbsp;</Button>
                )
            } else {
                buttons.push(
                    <Button onClick={this.assignGroupToCourse} bsStyle="primary">&nbsp;{element}&nbsp;</Button>
                )
            }
        });

        return (
            <ButtonToolbar>{buttons}</ButtonToolbar>
        );
    }

    render() {
        return (
            <Grid>
                <hr/>
                <h1 className="text-center" style={{fontWeight: 600}}>{this.details.name}</h1>
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
                        <Button onClick={this.assignGroupToCourse}  bsStyle="info">&nbsp;{"Seminars"}&nbsp;</Button>
                        <Button onClick={this.assignGroupToCourse}  bsStyle="info">&nbsp;{"Labs"}&nbsp;</Button>
                      </ButtonToolbar>
                    </Col>
                    <Col md={3}></Col>
                <br></br>
                </Row>
                <br></br>
                <Row className="show-grid text-center" >
                    <Col md={5}></Col>
                    <Row >
                            <Col style={{fontSize: '0.6em', color: 'blue' }} md={6}> Week:</Col>
                            <Col style={{fontSize: '0.5em', color: 'blue'}} md={3}><input type='text' defaultValue={"1-14"} size={2}
                                               ref={this.setWeekRef}/></Col>

                    </Row>
                    <Col md={5}></Col>
                </Row>
                <br></br>
                <Row className="show-grid text-center" >
                  <Col md={1}></Col>
                    <Row >
                        <Col style={{fontSize: '0.6em', color: 'blue'}} md={4}>Search student: </Col>
                        <Col style={{fontSize: '0.7em'}} md={7}><input type='text' defaultValue={""} size = {34}
                                               ref={this.setWeekRef}/></Col>
                    </Row>
                    <Col md={1}></Col>
                </Row>
                <br></br>
                <Table striped bordered condensed hover>
                   <thead>
                    <tr>
                      <th></th>
                      <th>NAME</th>
                      <th>Homework</th>
                      <th>Present</th>
                      <th>Total presents</th>
                      <th>Exam</th>
                      <th>Final grade</th>
                    </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Amariei Iulian</td>
                        <td>10</td>
                        <td>true</td>
                        <td>8</td>
                        <td>null</td>
                        <td>3.5</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Amariei Andreea</td>
                        <td>10</td>
                        <td>true</td>
                        <td>8</td>
                        <td>null</td>
                        <td>3.5</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Amariei Andreea Iuliana Maria</td>
                        <td>10</td>
                        <td>true</td>
                        <td>8</td>
                        <td>null</td>
                        <td>3.5</td>
                      </tr>
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