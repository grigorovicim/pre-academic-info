import {Component} from "react";
import Header from "../commons/header/Header";
import Dashboard from "../courses/Dashboard";
import CourseActions from "../actions/Course.actions"
import * as React from "react";
import { connect } from 'react-redux';

import './CatalogPage.css';

class CoursesPage extends Component<any,any>
{

    constructor(props: any) {
        super(props);

        this.state = {
        };

        this.handleStudyChange = this.handleStudyChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSemesterChange = this.handleSemesterChange.bind(this);
        this.fetchCatalog = this.fetchCatalog.bind(this);
    }

    handleStudyChange(event: any) {
        const study = event.currentTarget.innerHTML
        this.props.dispatch(CourseActions.saveStudyFilter(study));
    }

    handleYearChange(event: any) {
        const year = event.currentTarget.innerHTML
        this.props.dispatch(CourseActions.saveYearFilter(year));
    }

    handleSemesterChange(event: any) {
        const semester = event.currentTarget.innerHTML
        this.props.dispatch(CourseActions.saveSemesterFilter(semester));
    }

    fetchCatalog() {
        this.props.dispatch(CourseActions.fetchCatalog(this.props));
    }

    public render() {
        const {
            items,
            study,
            year,
            semester,
        } = this.props;

        const highlightColor = "#A4E2AC"
        const nonHighlightColor = "#E3F8E5"

        let backgroundColorForStudyFirst = nonHighlightColor
        let backgroundColorForStudySecond = nonHighlightColor
        let backgroundColorForStudyThird = nonHighlightColor

        if (study === "LICENTA") {
            backgroundColorForStudyFirst = highlightColor
        } else if (study === "MASTERAT") {
            backgroundColorForStudySecond = highlightColor
        } else {
            backgroundColorForStudyThird = highlightColor
        }

        let backgroundColorForYearFirst = nonHighlightColor
        let backgroundColorForYearSecond = nonHighlightColor
        let backgroundColorForYearThird = nonHighlightColor

        if (year === "I") {
            backgroundColorForYearFirst = highlightColor
        } else if (year === "II") {
            backgroundColorForYearSecond = highlightColor
        } else {
            backgroundColorForYearThird = highlightColor
        }

        let backgroundColorForSemesterFirst = nonHighlightColor
        let backgroundColorForSemesterSecond = nonHighlightColor

        if (semester === "I") {
            backgroundColorForSemesterFirst = highlightColor
        } else {
            backgroundColorForSemesterSecond = highlightColor
        }

        return (
            <div className="p-app">
                <Header home="none" courses="none" students="none" catalog="inline" myProfile="none"/>

                <div className="p-filter-container">
                    <div className="p-filter-item">
                        <div className="p-filter-item-title">STUDY:</div>
                        <div className="p-filter-item-buttons">
                            <div className="p-filter-item-button" onClick={this.handleStudyChange} style = {{backgroundColor: backgroundColorForStudyFirst}}>LICENTA</div>
                            <div className="p-filter-item-button" onClick={this.handleStudyChange} style = {{backgroundColor: backgroundColorForStudySecond}}>MASTERAT</div>
                            <div className="p-filter-item-button" onClick={this.handleStudyChange} style = {{backgroundColor: backgroundColorForStudyThird}}>DOCTORAT</div>
                        </div>
                    </div>
                    
                    <div className="p-filter-item">
                        <div className="p-filter-item-title">YEAR:</div>
                        <div className="p-filter-item-buttons">
                            <div className="p-filter-item-button" onClick={this.handleYearChange} style = {{backgroundColor: backgroundColorForYearFirst}}>I</div>
                            <div className="p-filter-item-button" onClick={this.handleYearChange} style = {{backgroundColor: backgroundColorForYearSecond}}>II</div>
                            <div className="p-filter-item-button" onClick={this.handleYearChange} style = {{backgroundColor: backgroundColorForYearThird}}>III</div>
                        </div>
                    </div>

                    <div className="p-filter-item">
                        <div className="p-filter-item-title">SEMESTER:</div>
                        <div className="p-filter-item-buttons">
                            <div className="p-filter-item-button" onClick={this.handleSemesterChange} style = {{backgroundColor: backgroundColorForSemesterFirst}}>I</div>
                            <div className="p-filter-item-button" onClick={this.handleSemesterChange} style = {{backgroundColor: backgroundColorForSemesterSecond}}>II</div>
                        </div>
                    </div>
                </div>

                <Dashboard courseItems={items}/>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        items: state.courseReducer.items,
        study: state.courseReducer.study,
        year: state.courseReducer.year,
        semester: state.courseReducer.semester,
    };
  };
  
  export default connect(
    mapStateToProps,
  )(CoursesPage);