import * as React from "react";
import {Component} from "react";
import './ProfessorsList.css';

import {connect} from 'react-redux';
import {removeProfessorConfig} from '../actions/Config.actions';

class DashboardProfessorItem extends Component<any, any> {
    private firstName: any;
    private lastName: any;
    private courseId: any;
    private professorId: any;

    constructor(props: any) {
        super(props);
        this.firstName = this.props.professor.first_name;
        this.lastName = this.props.professor.last_name;
        this.courseId = this.props.courseId;
        this.professorId = this.props.professorId;

        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
        this.props.removeProfessorConfig(this.professorId, this.courseId);
    }

    render() {
        return (
            <div>
                {this.firstName} {this.lastName}
                <button onClick={this.handleRemove}>x</button>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    professors: state.professorReducer.items,
    professorProfile: state.professorReducer.professorProfile
});

export default connect(mapStateToProps, {removeProfessorConfig})(DashboardProfessorItem);