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
        let study = 0;
        switch (event.currentTarget.innerHTML) {
            case "LICENTA":
                study = 1;
                break;
            case "MASTERAT":
                study = 2;
                break;
            case "DOCTORAT":
                study = 3;
        }
        this.props.dispatch(CourseActions.saveStudyFilter(study.toString()));
    }

    handleYearChange(event: any) {
        let year = 0;
        switch (event.currentTarget.innerHTML) {
            case "I":
                year = 1;
                break;
            case "II":
                year = 2;
                break;
            case "III":
                year = 3;
        }
        this.props.dispatch(CourseActions.saveYearFilter(year.toString()));
    }

    handleSemesterChange(event: any) {
        let semester = 0;
        switch (event.currentTarget.innerHTML) {
            case "I":
                semester = 1;
                break;
            case "II":
                semester = 2;

        }
        this.props.dispatch(CourseActions.saveSemesterFilter(semester.toString()));
    }

    fetchCatalog() {
        this.props.dispatch(CourseActions.fetchCatalog(this.props));
    }

    public render() {
        const {
            filteredItems,
            study,
            year,
            semester,
        } = this.props;

        const highlightColor = "#A4E2AC"
        const nonHighlightColor = "#E3F8E5"

        let backgroundColorForStudyFirst = nonHighlightColor
        let backgroundColorForStudySecond = nonHighlightColor
        let backgroundColorForStudyThird = nonHighlightColor

        if (study === "1") {
            backgroundColorForStudyFirst = highlightColor
        } else if (study === "2") {
            backgroundColorForStudySecond = highlightColor
        } else {
            backgroundColorForStudyThird = highlightColor
        }

        let backgroundColorForYearFirst = nonHighlightColor
        let backgroundColorForYearSecond = nonHighlightColor
        let backgroundColorForYearThird = nonHighlightColor

        if (year === "1") {
            backgroundColorForYearFirst = highlightColor
        } else if (year === "2") {
            backgroundColorForYearSecond = highlightColor
        } else {
            backgroundColorForYearThird = highlightColor
        }

        let backgroundColorForSemesterFirst = nonHighlightColor
        let backgroundColorForSemesterSecond = nonHighlightColor

        if (semester === "1") {
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

                <Dashboard courseItems={filteredItems} dashboardPage="catalog" />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        items: state.courseReducer.items,
        filteredItems: state.courseReducer.filteredItems,
        study: state.courseReducer.study,
        year: state.courseReducer.year,
        semester: state.courseReducer.semester,
    };
};

export default connect(
    mapStateToProps,
)(CoursesPage);