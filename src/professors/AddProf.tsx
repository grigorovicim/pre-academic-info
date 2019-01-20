import * as React from "react";
import { Component } from "react";
import './AddProf.css'
import searchLogo from '../images/search.png';
// @ts-ignore
import {addProfessor} from "../actions/Professor.actions";
import {createProfessorCourse} from "../actions/ProfessorCourse.actions";
import {removeProfessorConfig} from "../actions/Config.actions";
import { fetchProfessorsEnrolled, fetchProfessorsNotEnrolled,} from '../actions/Professor.actions';
import { connect } from 'react-redux';
import ProfItem from './ProfItem';

class AddProf extends Component<any, any>{
    private searchKeyword: any;

    constructor(props){
        super(props);
        this.state={
        };
        this.done = this.done.bind(this);
        this.getFilteredProfessors = this.getFilteredProfessors.bind(this);
        this.removeProfessor = this.removeProfessor.bind(this);
        this.addProfessor = this.addProfessor.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }


    componentWillMount() {
        this.props.fetchProfessorsEnrolled(this.props.courseId, this.searchKeyword);
        this.props.fetchProfessorsNotEnrolled(this.props.courseId, this.searchKeyword);
    }

    handleOnChange(event){
        this.searchKeyword = event.target.value;

        if(this.searchKeyword === '') {
            this.searchKeyword = null;
        }
    }

    getFilteredProfessors(){
        console.log("Filter professors by" + this.searchKeyword);
        this.props.fetchProfessorsEnrolled(this.props.courseId, this.searchKeyword);
        this.props.fetchProfessorsNotEnrolled(this.props.courseId, this.searchKeyword);
    }

    done(){
        this.props.callback();
    }

    removeProfessor(professor){
        this.props.removeProfessorConfig(professor.id,this.props.courseId);
        this.props.fetchProfessorsEnrolled(this.props.courseId, this.searchKeyword);
        this.props.fetchProfessorsNotEnrolled(this.props.courseId, this.searchKeyword);
    }

    addProfessor(professor){
        console.log("Professor was added");
        console.log(professor);
        this.props.createProfessorCourse({
            professor_id: professor.id,
            course_id: this.props.courseId
        });

        this.props.fetchProfessorsEnrolled(this.props.courseId, this.searchKeyword);
        this.props.fetchProfessorsNotEnrolled(this.props.courseId, this.searchKeyword);
    }

    render(){
        const enrolled = this.props.professorsEnrolled.map( professor => {
            return(
                    <ProfItem key={professor.id} professor={professor} courseId={3} enrolled={true} callback={this.removeProfessor}/>
            )
            }
        );
        const notEnrolled = this.props.professorsNotEnrolled.map( professor => {
                return(
                    <ProfItem key={professor.id} professor={professor} courseId={3} enrolled={false} callback={this.addProfessor}/>
                )
            }
        );

        return(
            <div>
                <div className="p-header-wrapper">
                    <div className="p-course-title">
                        Design patterns
                    </div>
                    <div className="p-course-configuration">
                        Course configuration
                    </div>
                    <div className="p-add-professor-header">
                        Add professor
                    </div>
                </div>

                <div className="p-search-container">
                    <div className="p-search-professor">
                        Search professor:
                    </div>
                    <div className="p-search-bar-container">
                        <input type="text" placeholder="Search by name" className="p-search-bar" onChange={this.handleOnChange}/>
                        <img src={searchLogo} onClick={this.getFilteredProfessors} className="p-search-logo"/>
                    </div>
                </div>
                <div className="p-professors-container">
                    <div className="p-professors-list-container">
                        <table className="p-professors-table">
                            <tr>
                                <th/>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Faculty</th>
                                <th>Line</th>
                                <th>Year</th>
                                <th/>
                            </tr>
                            {enrolled}
                            {notEnrolled}
                        </table>
                    </div>
                </div>

                <div className="p-button-container">
                    <button onClick={this.done} className="p-done-button">Done</button><br/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    professorsEnrolled: state.professorcourseReducer.enrolled,
    professorsNotEnrolled: state.professorcourseReducer.notEnrolled
});


export default connect(mapStateToProps, { fetchProfessorsEnrolled, fetchProfessorsNotEnrolled, createProfessorCourse, removeProfessorConfig})(AddProf);