import * as React from "react";
import { Component } from "react";

import * as PropTypes from 'prop-types'; 
import { connect } from 'react-redux'; 
import { removeStudentConfig } from '../actions/Config.actions'; 

class StudentsListItem extends Component<any, any>{

    private first_name;
    private last_name;
    private courseId;
    private studentId;

    constructor(props: any) {
        super(props);

        this.first_name = this.props.student.first_name;
        this.last_name = this.props.student.last_name;
        this.courseId = this.props.courseId;
        this.studentId = this.props.student.id;

        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
        this.props.removeStudentConfig(this.studentId, this.courseId);
    }

    render(){
        return(
            <div>
                {first_name} {last_name} <button onClick={this.handleRemove}>x</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    students: state.studentReducer.items
});

export default connect(mapStateToProps, { removeStudentConfig })(StudentsListItem);

