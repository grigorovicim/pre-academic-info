import * as React from "react";
import { Component } from "react";
import './ActivityDetail.css';
import { Grid, Row, Col, ButtonToolbar, Table } from 'react-bootstrap';
import { connect } from "react-redux";
import CatalogActions from "../actions/Catalog.actions";
import ActivityElementRow from "../students/ActivityElementRow";


class ActivityDetail extends Component<any, any> {
    private details: any;
    private groups = [15, 16, 17, 18, 19, 20];

    constructor(props: any) {
        super(props);
        this.details = props.details;

        this.renderGroups = this.renderGroups.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
        this.filterByClass = this.filterByClass.bind(this);
        this.handleWeekChange = this.handleWeekChange.bind(this);
        this.handleStudentStringChange = this.handleStudentStringChange.bind(this);

        this.fetchData();
    }

    fetchData() {
        const data = {
            courseid: this.details.id,
            studentstring: this.props.studentSubstring,
            week: this.props.week,
            groupid: this.props.group
        }
        this.props.dispatch(CatalogActions.fetchActivities(data))
    }

    renderGroups(currentGroup) {
        const buttons: any = [];
        this.groups.forEach(group => {
            buttons.push(
                <button className="p-group-button" onClick={this.handleGroupChange} style={currentGroup.toString() === group.toString() ? { backgroundColor: "#2e91c3", color: "#c6e9fb" } : {}}>{group + 916}</button>
            )
        })
        return (
            <ButtonToolbar className="p-group-buttons">{buttons}</ButtonToolbar>
        );
    }

    renderItems(items: any[]) {
        const tableRows: any = [];
        items.forEach(item => {
            tableRows.push(
                <ActivityElementRow key={item.id} item={item} classType={this.props.classType} week={this.props.week} course_id={this.details.id}/>
            )
        })
        return tableRows;
    }

    handleGroupChange = (event: any) => {
        this.props.dispatch(CatalogActions.saveGroup(event.target.textContent))
        setTimeout(() => {
            this.fetchData();
        }, 300)
    };

    filterByClass = (event: any) => {
        this.props.dispatch(CatalogActions.saveClassType(event.target.textContent))
        setTimeout(() => {

        }, 300)
    };

    handleWeekChange(event) {
        this.props.dispatch(CatalogActions.saveWeek(event.target.value))
        setTimeout(() => {
            this.fetchData();
        }, 300)
    }

    handleStudentStringChange(event) {
        this.props.dispatch(CatalogActions.saveStudentSubString(event.target.value))
        setTimeout(() => {
            this.fetchData();
        }, 300)
    }

    render() {
        let { items } = this.props
        const {
            group,
            classType,
            week,
            studentSubstring
        } = this.props;
        if (items === undefined) {
            items = []
        }
        return (
            <Grid className="p-add-activity-popup">
                <hr />
                <h1 className="p-title-add-activity-popup" style={{ fontWeight: 600 }}>{this.details.name}</h1>
                <Row className="show-grid text-center" >
                    <Col className="center-block" style={{ fontSize: '1.25em' }} md={12}>
                        {this.renderGroups(group)}
                    </Col>
                </Row>
                <br></br>
                <Row className="show-grid text-center" >
                    <Col md={3}></Col>
                    <Col md={6}>
                        <ButtonToolbar>
                            <button className="p-seminar-or-lab-button" onClick={this.filterByClass} style={classType.toString() === "Course" ? { backgroundColor: "#2e91c3", color: "#c6e9fb" } : {}}>Course</button>
                            <button className="p-seminar-or-lab-button" onClick={this.filterByClass} style={classType.toString() === "Seminar" ? { backgroundColor: "#2e91c3", color: "#c6e9fb" } : {}}>Seminar</button>
                            <button className="p-seminar-or-lab-button" onClick={this.filterByClass} style={classType.toString() === "Lab" ? { backgroundColor: "#2e91c3", color: "#c6e9fb" } : {}}>Lab</button>
                        </ButtonToolbar>
                    </Col>
                    <br></br>
                </Row>
                <br></br>
                <Row className="show-grid text-center" >
                    <Col md={5}></Col>
                    <Row >
                        <Col className="p-week-label-input"> Week:</Col>
                        <Col ><input className="p-week-input" type='text' size={2} value={week} onChange={this.handleWeekChange} /></Col>
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
                        <Col><input className="p-search-students-input" type='text' size={34} value={studentSubstring} onChange={this.handleStudentStringChange} /></Col>
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
                        {this.renderItems(items)}
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