import * as React from "react";
import { Component } from "react";
import './ActivityDetail.css';
import { Grid, Row, Col, ButtonToolbar, Table } from 'react-bootstrap';
import { connect } from "react-redux";
import CatalogActions from "../actions/Catalog.actions";


class ActivityDetail extends Component<any, any> {
    private details: any;

    //private course: any;
    private groups = [15, 16, 17, 18, 19, 20];


    constructor(props: any) {
        super(props);
        this.details = props.details;

        this.renderGroups = this.renderGroups.bind(this);
        this.filterByGroup = this.filterByGroup.bind(this);
        this.filterByClass = this.filterByClass.bind(this);
        this.fetchData();
    }

    fetchData(){
        const data = {
            courseid: this.details.id,
            studentstring: this.props.studentSubstring,
            week: this.props.week,
            groupid: this.props.group
        }
        this.props.dispatch(CatalogActions.fetchActivities(data))
    }

    filterByGroup = (event: any) => {
    };

    filterByClass = (event: any) => {
    };

    renderGroups() {
        const buttons: any = [];
        this.groups.forEach(group => {
            buttons.push(
                <button className="p-group-button" onClick={this.filterByGroup}>{group + 916}</button>
            )
        })
        return (
            <ButtonToolbar className="p-group-buttons">{buttons}</ButtonToolbar>
        );
    }

    render() {
        let {items} = this.props
        const {
            //items,
            // group,
            // classType,
            week,
            studentSubstring
        } = this.props;
        if(!items){
            items = []
        }
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
                            <button className="p-seminar-or-lab-button" onClick={this.filterByClass}>Courses</button>
                            <button className="p-seminar-or-lab-button" onClick={this.filterByClass}>Seminars</button>
                            <button className="p-seminar-or-lab-button" onClick={this.filterByClass}>Labs</button>
                        </ButtonToolbar>
                    </Col>
                    <br></br>
                </Row>
                <br></br>
                <Row className="show-grid text-center" >
                    <Col md={5}></Col>
                    <Row >
                        <Col className="p-week-label-input"> Week:</Col>
                        <Col ><input className="p-week-input" type='text' size={2} value={week} /></Col>
                    </Row>
                </Row>
                <br />
                <Row className="show-grid text-center" >
                    <Col md={3}></Col>
                    <Col md={6}>
                        <button className="p-done-button-add-activity">Done</button>
                    </Col>
                    <br></br>
                </Row>
                <br></br>
                <Row className="text-center" >
                    <Col md={1}></Col>
                    <Row >
                        <Col className="p-search-students-label-input">Search student: </Col>
                        <Col><input className="p-search-students-input" type='text' size={34} value={studentSubstring} /></Col>
                    </Row>
                    <Col md={1}></Col>
                </Row>
                <br></br>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th className="p-header-add-activity">NAME</th>
                            <th className="p-input-presents-header">Present</th>
                            <th className="p-header-add-activity">Activity Grade</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            items.map((item: any) =>
                                // tslint:disable-next-line:jsx-key
                                <tr>
                                    <td className="p-input-student">{item.Profile.first_name + " " + item.Profile.last_name}</td>
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
        items: state.catalogReducer.items,
        group: state.catalogReducer.group,
        classType: state.catalogReducer.classType,
        week: state.catalogReducer.week,
        studentSubstring: state.catalogReducer.studentSubstring,
    };
};

export default connect(
    mapStateToProps,
)(ActivityDetail);