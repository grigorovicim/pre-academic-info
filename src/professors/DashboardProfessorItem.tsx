import * as React from "react";
import { Component } from "react";
import './ProfessorsList.css';

import * as PropTypes from 'prop-types'; 
import { connect } from 'react-redux'; 
import { removeProfessorConfig } from '../actions/Config.actions'; 

class DashboardProfessorItem extends Component<any, any>{
    private name;
    private courseId;
    private professorId;

    constructor(props: any) {
        super(props);
        this.first_name = this.props.professor.first_name;
        this.last_name = this.props.professor.last_name;
        this.courseId = this.props.courseId;
        this.professorId = this.props.professor.id;

        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
        this.props.removeProfessorConfig(this.professorId, this.courseId);
    }

    render(){
        return(
            <div>
                {first_name} {last_name}
                <button onClick={this.handleRemove}>x</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    professors: state.professorReducer.items
});

export default connect(mapStateToProps, { removeProfessorConfig })(DashboardProfessorItem);