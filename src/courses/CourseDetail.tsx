import * as React from "react";
import {Component} from "react";

import './CourseDetail.css';

import {Grid, Row, Col, ButtonToolbar, Button} from 'react-bootstrap';
import {default as FormOfEvaluationActions} from "../actions/FormOfEvaluation.actions";
import {connect} from "react-redux";
// import axios from "axios";
// import {CREATE_FORM_OF_EVALUATION} from "../actions/types";

class CourseDetail extends Component<any, any> {
    private details: any;

    private courseNumber: any;
    private courseHours: any;
    private labsNumber: any;
    private labsHours: any;
    private labsPracticals: any;
    private seminarsNumber: any;
    private seminarsHours: any;
    private seminarsPartials: any;

    private setCourseNumberInputRef: any;
    private setCourseHoursInputRef: any;
    private setLabsNumberInputRef: any;
    private setLabsHoursInputRef: any;
    private setLabsPracticalsInputRef: any;
    private setSeminarsNumberInputRef: any;
    private setSeminarsHoursInputRef: any;
    private setSeminarsPartialsInputRef: any;

    constructor(props: any) {
        super(props);
        this.details = props.detail;
        this.renderGroups = this.renderGroups.bind(this);
        console.log(this.details);

        this.state = {
            selectedGroups: [],
        };

        this.courseNumber = null;
        this.courseHours = null;
        this.labsNumber = null;
        this.labsHours = null;
        this.labsPracticals = null;
        this.seminarsNumber = null;
        this.seminarsHours = null;
        this.seminarsPartials = null;

        this.setCourseNumberInputRef = (element: any) => {
            this.courseNumber = element;
        };
        this.setCourseHoursInputRef = (element: any) => {
            this.courseHours = element;
        };
        this.setLabsNumberInputRef = (element: any) => {
            this.labsNumber = element;
        };
        this.setLabsHoursInputRef = (element: any) => {
            this.labsHours = element;
        };
        this.setLabsPracticalsInputRef = (element: any) => {
            this.labsPracticals = element;
        };
        this.setSeminarsNumberInputRef = (element: any) => {
            this.seminarsNumber = element;
        };
        this.setSeminarsHoursInputRef = (element: any) => {
            this.seminarsHours = element;
        };
        this.setSeminarsPartialsInputRef = (element: any) => {
            this.seminarsPartials = element;
        };

        // axios.post('/formOfEvaluation', {item: item, sessionId: sessionId})
        //     .then((response) => {
        //
        //     })
        //     .catch((error) => {
        //         throw error;
        //     })
        //     .then(() => {
        //
        //     });
    }

    insertCourseDetails() {
        const {
            selectedGroups,
        } = this.state;

        const courseNumber = this.courseNumber.value;
        const courseHours = this.courseHours.value;
        const labsNumber = this.labsNumber.value;
        const labsHours = this.labsHours.value;
        const labsPracticals = this.labsPracticals.value;
        const seminarsNumber = this.seminarsNumber.value;
        const seminarsHours = this.seminarsHours.value;
        const seminarsPartials = this.seminarsPartials.value;

        const newCourseDetails = {
            courseNumber: courseNumber,
            courseHours: courseHours,
            labsNumber: labsNumber,
            labsHours: labsHours,
            labsPracticals: labsPracticals,
            seminarsNumber: seminarsNumber,
            seminarsHours: seminarsHours,
            seminarsPartials: seminarsPartials,
            selectedGroups: selectedGroups,
        };

        this.props.dispatch(FormOfEvaluationActions.createFormOfEvaluationActions(newCourseDetails, this.props.userDetails.session));
    }

    //What tells us the field. Ex: what= "number" means that the handler
    //was called on the course number input field 
    handleKeyPress = (event: any, what: string) => {
        if (event.key === 'Enter') {
            switch (what) {
                case ("number"):
                    console.log(event.target.value);
                    break;
            }
        }
    };
    assignGroupToCourse = (event: any) => {
        //here you may handle the problem of adding a group to the course
        console.log(event)
    };

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
                    <Button onClick={this.assignGroupToCourse} bsStyle="primary">&nbsp;{element}&nbsp;</Button>
                )
            } else {
                buttons.push(
                    <Button onClick={this.assignGroupToCourse} bsStyle="default">&nbsp;{element}&nbsp;</Button>
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
                <h1 className="text-center" style={{fontWeight: 600}}>{this.details.name}</h1>
                <h3 className="text-center" style={{color: "gray"}}>Course Configuration</h3>
                <br/>
                <br/>
                <br/>
                <Row className="show-grid text-center">
                    <Col style={{fontSize: '1.5em'}} md={2}>Course</Col>
                    <Col style={{fontSize: '1.25em'}} md={4}>
                        Number: <input type='text' defaultValue={this.details.number} size={1}
                                       onKeyPress={(event) => this.handleKeyPress(event, 'number')}
                                       ref={this.setCourseNumberInputRef}/>
                    </Col>
                    <Col style={{fontSize: '1.25em'}} md={4}>
                        Hours: <input type='text' defaultValue={this.details.hours} size={1}
                                      ref={this.setCourseHoursInputRef}/>
                    </Col>
                </Row>
                <hr/>
                <Row className="show-grid">
                    <Col className="text-center" style={{fontSize: '1.5em'}} md={2}>Description</Col>
                    <Col style={{fontSize: '1em'}} md={8}>
                        {this.details.description}
                    </Col>
                </Row>
                <hr/>
                <Row className="show-grid">
                    <Col className="text-center" style={{fontSize: '1.5em'}} md={2}>Rules</Col>
                    <Col style={{fontSize: '1em'}} md={8}>
                        {this.details.rules}
                    </Col>
                </Row>
                <hr/>
                <Row className="show-grid">
                    <Col className="text-center" style={{fontSize: '1.5em'}} md={2}>Labs</Col>

                    <Col style={{fontSize: '1em'}} md={4}>
                        <Row style={{fontSize: '1.25em'}}>
                            <Col md={4}>Number:</Col>
                            <Col md={1}><input type='text' defaultValue={this.details.labs.number} size={1}
                                               ref={this.setLabsNumberInputRef}/></Col>
                        </Row>
                        <Row style={{fontSize: '1.25em'}}>
                            <Col md={4}>Hours:</Col>
                            <Col md={1}><input type='text' defaultValue={this.details.labs.hours} size={1}
                                               ref={this.setLabsHoursInputRef}/></Col>
                        </Row>
                        <Row style={{fontSize: '1.25em'}}>
                            <Col md={4}>Practicals:</Col>
                            <Col md={1}><input type='text' defaultValue={this.details.labs.practicals} size={1}
                                               ref={this.setLabsPracticalsInputRef}/></Col>
                        </Row>
                    </Col>

                    <Col style={{fontSize: '1.25em'}} md={2}>
                        Professors:
                    </Col>

                    <Col style={{fontSize: '1em'}}>
                        {/* Professors list component for labs*/}
                        Professor1 <br/>
                        Professor2 <br/>
                        Professor3
                    </Col>
                </Row>
                <hr/>

                <Row className="show-grid">
                    <Col className="text-center" style={{fontSize: '1.5em'}} md={2}>Seminars</Col>

                    <Col style={{fontSize: '1em'}} md={4}>
                        <Row style={{fontSize: '1.25em'}}>
                            <Col md={4}>Number:</Col>
                            <Col md={1}><input type='text' defaultValue={this.details.seminars.number} size={1}
                                               ref={this.setSeminarsNumberInputRef}/></Col>
                        </Row>
                        <Row style={{fontSize: '1.25em'}}>
                            <Col md={4}>Hours:</Col>
                            <Col md={1}><input type='text' defaultValue={this.details.seminars.hours} size={1}
                                               ref={this.setSeminarsHoursInputRef}/></Col>
                        </Row>
                        <Row style={{fontSize: '1.25em'}}>
                            <Col md={4}>Partials:</Col>
                            <Col md={1}><input type='text' defaultValue={this.details.seminars.partials} size={1}
                                               ref={this.setSeminarsPartialsInputRef}/></Col>
                        </Row>
                    </Col>

                    <Col style={{fontSize: '1.25em'}} md={2}>
                        Professors:
                    </Col>

                    <Col style={{fontSize: '1em'}}>
                        {/* Professors list component for seminars*/}
                        Professor1 <br/>
                        Professor2
                    </Col>
                </Row>
                <hr/>
                <Row className="show-grid text-center">
                    <Col style={{fontSize: '1.5em'}} md={2}>Groups</Col>
                    <Col style={{fontSize: '1.25em'}} md={8}>
                        {this.renderGroups()}
                    </Col>
                </Row>
                <hr/>
                <Row className="show-grid text-center">
                    <Col style={{fontSize: '1.5em'}} md={2}>Students</Col>
                    <Col style={{fontSize: '1.25em'}} md={4}>
                        Students list component
                    </Col>
                </Row>
                <br/><br/>
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
)(CourseDetail);