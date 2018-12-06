import * as React from "react";
import { Component } from "react";

import { connect } from 'react-redux'; 
import { removeStudentConfig } from '../actions/Config.actions'; 

class StudentsListItem extends Component<any, any> {
    private firstName;
    private lastName;
    private courseId;
    private studentId;

    constructor(props: any) {
        super(props);

        this.firstName = this.props.student.first_name;
        this.lastName = this.props.student.last_name;
        this.courseId = this.props.courseId;
        this.studentId = this.props.studentId;

        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
        this.props.removeStudentConfig(this.studentId, this.courseId);
    }

    render(){
        return(
            <div>
                {this.firstName} {this.lastName} <button onClick={this.handleRemove}>x</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    students: state.studentReducer.items,
    studentProfile: state.studentReducer.studentProfile
});

export default connect(mapStateToProps, { removeStudentConfig })(StudentsListItem);

