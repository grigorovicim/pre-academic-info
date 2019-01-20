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

        this.state = {
            presenceId: !!presence ? presence.id : 0,
            activityId: !!activity ? activity.id : 0,
            presenceCheckbox: !!presence,
            activityInput: !!activity ? activity.grade : '',
        };

        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.onSaveButton = this.onSaveButton.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        const presence = nextProps.item[nextProps.classType + 'Presences'][0];
        const activity = nextProps.item[nextProps.classType + 'Activities'][0];

        this.setState({
            presenceId: !!presence ? presence.id : 0,
            activityId: !!activity ? activity.id : 0,
            presenceCheckbox: !!presence,
            activityInput: !!activity ? activity.grade : '',
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
                           onChange={this.handleInput}/>
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

    handleInput(event) {
        this.setState({activityInput: event.target.value});
    };

    onSaveButton() {
        console.log(this.state.presenceId);
        console.log(this.state.activityId);
        const presence = {
            id: this.state.presenceId,
            week: this.props.week,
            student_id: this.props.item.id,
            course_id: this.props.course_id
        }

        const activity = {
            id: this.state.activityId,
            grade: this.state.activityInput,
            week: this.props.week,
            student_id: this.props.item.id,
            course_id: this.props.course_id
        }

        const body = {}
        body[this.props.classType + 'Presence'] = presence
        body[this.props.classType + 'Activitie'] = activity

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
