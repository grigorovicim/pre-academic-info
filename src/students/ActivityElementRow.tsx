import * as React from "react";
import {Component} from "react";
import '../courses/ActivityDetail.css';
import CatalogActions from 'src/actions/Catalog.actions';
import { connect } from "react-redux";

class ActivityElementRow extends Component<any, any> {
    constructor(props: any) {
        super(props);

        const presence = this.props.item[this.props.classType + 'Presences'][0];
        const activity = this.props.item[this.props.classType + 'Activities'][0];
        const practicalExam = this.props.item.ExamPracticalResults[0];
        const writtenExam = this.props.item.ExamWrittenResults[0];
        const finalGrade = this.props.item.FinalGrades[0];


        this.state = {
            presenceId: !!presence ? presence.id : 0,
            activityId: !!activity ? activity.id : 0,
            presenceCheckbox: !!presence,
            activityInput: !!activity ? activity.grade : '',
            practicalExamGrade: !!practicalExam ? practicalExam.grade : '',
            writtenExamGrade: !!writtenExam ? writtenExam.grade : '',
            finalGrade: !!finalGrade ? practicalExam.grade : '',
        };

        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleActivityGradeInput = this.handleActivityGradeInput.bind(this);
        this.handlePracticalExamGradeInput = this.handlePracticalExamGradeInput.bind(this);
        this.handleWrittenExamGradeInput = this.handleWrittenExamGradeInput.bind(this);
        this.handleFinalGradeInput = this.handleFinalGradeInput.bind(this);
        this.onSaveButton = this.onSaveButton.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        const presence = nextProps.item[nextProps.classType + 'Presences'][0];
        const activity = nextProps.item[nextProps.classType + 'Activities'][0];
        const practicalExam = this.props.item.ExamPracticalResults[0];
        const writtenExam = this.props.item.ExamWrittenResults[0];
        const finalGrade = this.props.item.FinalGrades[0];

        this.setState({
            presenceId: !!presence ? presence.id : 0,
            activityId: !!activity ? activity.id : 0,
            presenceCheckbox: !!presence,
            activityInput: !!activity ? activity.grade : '',
            practicalExamGrade: !!practicalExam ? practicalExam.grade : '',
            writtenExamGrade: !!writtenExam ? writtenExam.grade : '',
            finalGrade: !!finalGrade ? practicalExam.grade : '',
        });
    }

    render() {
        const {item} = this.props;
        return (
            <tr>
                <td className="p-input-student">{item.Profile.first_name + " " + item.Profile.last_name}</td>
                <td className="p-input-student">
                    <input type="checkbox" checked={this.state.presenceCheckbox} onChange={this.handleCheckbox}/>
                </td>
                <td className="p-input-student">
                    <input className="p-input-present-student" value={this.state.activityInput}
                           onChange={this.handleActivityGradeInput}/>
                </td>
                <td className="p-input-student">
                    <input className="p-input-present-student" value={this.state.practicalExamGrade}
                           onChange={this.handlePracticalExamGradeInput}/>
                </td>
                <td className="p-input-student">
                    <input className="p-input-present-student" value={this.state.writtenExamGrade}
                           onChange={this.handleWrittenExamGradeInput}/>
                </td>
                <td className="p-input-student">
                    <input className="p-input-present-student" value={this.state.finalGrade}
                           onChange={this.handleFinalGradeInput}/>
                </td>
                <td className="p-input-student">
                    <button className="p-save-student-activity" onClick={this.onSaveButton}>Save</button>
                </td>
            </tr>
        );
    }

    handleCheckbox(event) {
        this.setState({presenceCheckbox: event.target.checked});
    };

    handleActivityGradeInput(event) {
        this.setState({activityInput: event.target.value});
    };

    handlePracticalExamGradeInput(event) {
        this.setState({practicalExamGrade: event.target.value});
    };

    handleWrittenExamGradeInput(event) {
        this.setState({writtenExamGrade: event.target.value});
    };

    handleFinalGradeInput(event) {
        this.setState({finalGrade: event.target.value});
    };

    onSaveButton() {
        console.log(this.state.presenceId);
        console.log(this.state.activityId);
        // const presence = {
        //     id: this.state.presenceId,
        //     week: this.props.week,
        //     student_id: this.props.item.id,
        //     course_id: this.props.course_id
        // }

        const activity = {
            id: this.state.activityId,
            grade: this.state.activityInput,
            week: this.props.week,
            student_id: this.props.item.id,
            course_id: this.props.course_id,
            professor_id: 1
        }

        const body = {}
        body[this.props.classType + 'Activity'] = activity

        this.props.dispatch(CatalogActions.addActivity(body))

    };
}
const mapStateToProps = (state: any) => {
    return {

    };
};

export default connect(
    mapStateToProps,
)(ActivityElementRow);
