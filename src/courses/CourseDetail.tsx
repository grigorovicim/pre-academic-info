import * as React from "react";
import {Component} from "react";
import 'font-awesome/css/font-awesome.min.css'
import './CourseDetail.css';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import Popup from "../commons/Popup";
import {connect} from "react-redux";
import * as PropTypes from 'prop-types';
import axios from "axios";

class CourseDetail extends Component<any, any> {
    static propTypes = {
        courseConfig: PropTypes.any
    };

    //ca si props avem course

    constructor(props: any) {
        super(props);

        this.submit = this.submit.bind(this);

        this.getFromChildSeminar = this.getFromChildSeminar.bind(this);
        this.getFromChildLab = this.getFromChildLab.bind(this);
        this.getFromChildCourse = this.getFromChildCourse.bind(this);

        this.openLabTestsPopup = this.openLabTestsPopup.bind(this);
        this.openSeminarTestsPopup = this.openSeminarTestsPopup.bind(this);
        this.openCourseTestsPopup = this.openCourseTestsPopup.bind(this);

        this.onRulesChange = this.onRulesChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onCoursePercentageChange = this.onCoursePercentageChange.bind(this)
        this.onSeminarPercentageChange = this.onSeminarPercentageChange.bind(this)
        this.onLabPercentageChange = this.onLabPercentageChange.bind(this)

        this.onWrittenExamPercentageChange = this.onWrittenExamPercentageChange.bind(this)
        this.onPracticalExamPercentageChange = this.onPracticalExamPercentageChange.bind(this)

        this.onCourseNumberChange = this.onCourseNumberChange.bind(this);
        this.onSeminarNumberChange = this.onSeminarNumberChange.bind(this);
        this.onLabNumberChange = this.onLabNumberChange.bind(this);

        this.onCourseTestsChange = this.onCourseTestsChange.bind(this);
        this.onSeminarTestsChange = this.onSeminarTestsChange.bind(this);
        this.onLabTestsChange = this.onLabTestsChange.bind(this);

        this.closeLabPopup = this.closeLabPopup.bind(this);
        this.closeSeminarPopup = this.closeSeminarPopup.bind(this);
        this.closeCoursePopup = this.closeCoursePopup.bind(this);


            this.state = {

                // courseWeeks: this.props.detail.courses.weeks,
                // seminarWeeks: this.props.detail.seminars.weeks,
                // labWeeks: this.props.detail.labs.weeks,

                courseWeeks: 3,
                seminarWeeks: 4,
                labWeeks: 5,

                isSeminarPopupVisible: false,
                isCoursePopupVisible: false,
                isLabPopupVisible: false,

                popupSeminarComponentType: null,
                popupCourseComponentType: null,
                popupLabComponentType: null,

                initial: 'state',
        	}
    }

    componentWillMount() {
        this.setState({id:this.props.courseDetail.id});
        this.setState({seminarGradePercentage: this.props.courseDetail.seminarGradePercentage});
        this.setState({labGradePercentage: this.props.courseDetail.labGradePercentage});
        this.setState({lectureGradePercentage: this.props.courseDetail.lectureGradePercentage});
        this.setState({numberOfLectures: this.props.courseDetail.numberOfLectures});
        this.setState({description: this.props.courseDetail.description});
        this.setState({rules: this.props.courseDetail.rules});
        this.setState({hasLecture: this.props.courseDetail.hasLecture});
        this.setState({hasLab: this.props.courseDetail.hasLab});
        this.setState({hasSeminar: this.props.courseDetail.hasSeminar});
        this.setState({numberOfLectureTests: this.props.courseDetail.numberOfLectureTests});
        this.setState({numberOfSeminarTests: this.props.courseDetail.numberOfSeminarTests});
        this.setState({numberOfLabTests: this.props.courseDetail.numberOfLabTests});
        this.setState({numberOfSeminars: this.props.courseDetail.numberOfSeminars});
        this.setState({numberOfLabs: this.props.courseDetail.numberOfLabs});
        this.setState({numberOfSeminars: this.props.courseDetail.numberOfSeminars});
        this.setState({examWrittenPercentage: this.props.courseDetail.examWrittenPercentage});
        this.setState({examPracticalPercentage: this.props.courseDetail.examPracticalPercentage});
        this.setState({courseTestsPercentages:this.props.courseDetail.courseTestsPercentages});
        this.setState({labTestsPercentages:this.props.courseDetail.labTestsPercentages});
        this.setState({seminarTestsPercentages:this.props.courseDetail.seminarTestsPercentages});

    }

    getFromChildSeminar(data: any) {
        this.setState({seminarGradePercentage: data})
    }

    getFromChildLab(data: any) {
        this.setState({labGradePercentage: data})
    }

    getFromChildCourse(data: any) {
        this.setState({CourseTestPercentages: data})
    }

    onCourseNumberChange(e: any) {
        this.setState({numberOfLectures: e.target.value})
    }

    onSeminarNumberChange(e: any) {
        this.setState({numberOfSeminars: e.target.value})
    }

    onLabNumberChange(e: any) {
        this.setState({numberOfLabs: e.target.value})
    }

    onRulesChange(e: any) {
        this.setState({rules: e.target.value})
    }

    onDescriptionChange(e: any) {
        this.setState({description: e.target.value})
    }

    onCoursePercentageChange(e: any) {
        this.setState({lectureGradePercentage: e.target.value})
    }

    onSeminarPercentageChange(e: any) {
        this.setState({seminarGradePercentage: e.target.value})
    }

    onLabPercentageChange(e: any) {
        this.setState({labGradePercentage: e.target.value})
    }

    onCourseTestsChange(e: any) {
        this.setState({numberOfLectureTests: e.target.value})
    }

    onSeminarTestsChange(e: any) {
        this.setState({numberOfSeminarTests: e.target.value})
    }

    onLabTestsChange(e: any) {
        this.setState({numberOfLabTests: e.target.value})
    }

    onPracticalExamPercentageChange(e: any) {
        this.setState({examPracticalPercentage: e.target.value})
    }

    onWrittenExamPercentageChange(e: any) {
        this.setState({examWrittenPercentage: e.target.value})
    }

    closeLabPopup() {
        this.setState({
            isLabPopupVisible: false,
        });
    }

    closeSeminarPopup() {
        this.setState({
            isSeminarPopupVisible: false,
        });
    }

    closeCoursePopup() {
        this.setState({
            isCoursePopupVisible: false,
        });
    }

    openLabTestsPopup(e: any) {
        e.stopPropagation();
        this.setState({
            isLabPopupVisible: true,
            popupLabComponentType: 'p-lab-tests',
            numberOfLectureTests: this.state.numberOfLectureTests,
        });
    }

    openSeminarTestsPopup(e: any) {
        e.stopPropagation();
        this.setState({
            isSeminarPopupVisible: true,
            popupSeminarComponentType: 'p-seminar-tests',
            numberOfSeminarTests: this.state.numberOfSeminarTests,
        });
    }

    openCourseTestsPopup(e: any) {
        e.stopPropagation();
        this.setState({
            isCoursePopupVisible: true,
            popupCourseComponentType: 'p-course-tests',
            numberOfLectureTests: this.state.numberOfLectureTests,
        });
    }

    submit() {
        if(this.state.id != null){
            //update
            const body = this.state;
            axios.put('/courseconfig',
                {courseConfig:body})
                .then(res =>{
                    console.log(res.data);
                    alert(res.data);
                })
                .catch(error => {
                    console.log(error)
                });
        }
        else
        {
            //create
            const body = this.state;
            axios.post('/courseconfig',body)
                .then(res =>{
                    console.log(res.data);
                    alert(res.data);
                })
                .catch(error => {
                    console.log(error)
                });
        }

        return this.state;
    }

    render() {

        return (

            <Grid>
                <h1 className="text-center" style={{fontWeight: 600}}>{this.props.course.name}</h1>
                <h3 className="text-center" style={{color: "gray"}}>Course Configuration</h3>
                <br/>
                <br/>

                <Row className="show-grid">
                    <Col className="text-center" style={{fontSize: '1.5em', color: 'gray'}} md={4}>Description</Col>
                    <Col style={{fontSize: '1em', color: 'gray'}} md={8}>
                        <textarea className="form-control" defaultValue={this.state.description}
                                  onChange={this.onDescriptionChange}/>
                    </Col>
                </Row>

                <Row className="show-grid">
                    <Col className="text-center" style={{fontSize: '1.5em', color: 'gray'}} md={4}>Rules</Col>
                    <Col style={{fontSize: '1em', color: 'gray'}} md={8}>
                        <textarea className="form-control" defaultValue={this.state.rules}
                                  onChange={this.onRulesChange}/>
                    </Col>
                </Row>
                <Row className="show-grid text-center">
                    <Col md={2}>
                        <input type="checkbox" defaultChecked={this.state.hasLecture} onChange={() => {this.setState({hasLecture:!this.state.hasLecture});}}/>
                    </Col>
                    <Col style={{fontSize: '1.5em', color: 'gray'}} md={10} className="text-left">
                        Course
                    </Col>
                    {this.state.hasLecture &&
                    <Col style={{fontSize: '1em', color: 'gray'}} md={10}>
                        <Row style={{fontSize: '1.25em', color: 'gray'}}>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={4} className="text-left">Number:</Col>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={2}>
                                <input type='text' value={this.state.numberOfLectures} onChange={this.onCourseNumberChange}/>
                            </Col>
                        </Row>
                        <Row style={{fontSize: '1.25em', color: 'gray'}}>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={4} className="text-left">Percentage: </Col>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={2}>
                                <input type='text' value={this.state.lectureGradePercentage} onChange={this.onCoursePercentageChange}/>
                            </Col>
                        </Row>
                        <Row style={{fontSize: '1.25em', color: 'gray'}}>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={4} className="text-left">Activities:</Col>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={2}>
                                <input type='text' value={this.state.numberOfLectureTests} onChange={this.onCourseTestsChange}/>
                            </Col>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={1}>
                                <Button onClick={this.openCourseTestsPopup}>
                                    <i className="fa fa-cog" aria-hidden="true"/>
                                </Button>
                            </Col>

                        </Row>
                    </Col>
                    }
                </Row>
                <th/>
                <Row className="show-grid text-center">
                    <Col md={2}>
                        <input type="checkbox" defaultChecked={this.state.hasLab} onChange={() => {this.setState({hasLab: !this.state.hasLab});}}/>
                    </Col>
                    <Col className="text-left" style={{fontSize: '1.5em', color: 'gray'}} md={5}>Labs</Col>
                    {this.state.hasLab &&
                    <Col style={{fontSize: '1em', color: 'gray'}} md={6}>
                        <Row style={{fontSize: '1.25em', color: 'gray'}}>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={6} className="text-left">Number:</Col>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={4}>
                                <input type='text' value={this.state.numberOfLabs} onChange={this.onLabNumberChange}/>
                            </Col>
                        </Row>
                        <Row style={{fontSize: '1.25em', color: 'gray'}}>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={6} className="text-left">Percentage: </Col>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={4}>
                                <input type='text' value={this.state.labGradePercentage} onChange={this.onLabPercentageChange}/>
                            </Col>
                        </Row>
                        <Row style={{fontSize: '1.25em', color: 'gray'}}>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={6} className="text-left">Activities:</Col>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={4}>
                                <input type='text' value={this.state.numberOfLabTests} onChange={this.onLabTestsChange}/>
                            </Col>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={1}><Button
                                onClick={this.openLabTestsPopup}>
                                <i className="fa fa-cog" aria-hidden="true"/>
                            </Button>
                            </Col>
                        </Row>
                    </Col>
                    }
                    {this.state.hasLab  &&
                    <Col style={{fontSize: '1.25em', color: 'gray'}} md={6} className="text-left">
                        Professors:
                        <Row>
                            {this.state.hasLab  &&
                            <div>
                                {/* Professors list component for labs*/}
                                Professor1 <br/>
                                Professor2 <br/>
                                Professor3
                            </div>
                            }
                        </Row>
                    </Col>
                    }
                </Row>
                <hr/>
                <Row className="show-grid text-center">
                    <Col md={2}>
                        <input type="checkbox" defaultChecked={this.state.hasSeminar} onChange={() => {this.setState({hasSeminar: !this.state.hasSeminar});}}/>
                    </Col>
                    <Col className="text-left" style={{fontSize: '1.5em', color: 'gray'}} md={10}>Seminars</Col>
                    {this.state.hasSeminar &&
                    <Col style={{fontSize: '1em', color: 'gray'}} md={6}>
                        <Row style={{fontSize: '1.25em', color: 'gray'}}>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={6} className="text-left">Number:</Col>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={4}>
                                <input type='text' value={this.state.numberOfSeminars} onChange={this.onSeminarNumberChange}/>
                            </Col>
                        </Row>
                        <Row style={{fontSize: '1.25em', color: 'gray'}}>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={6} className="text-left">Percentage: </Col>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={4}>
                                <input type='text' value={this.state.seminarGradePercentage} onChange={this.onSeminarPercentageChange}/>
                            </Col>
                        </Row>
                        <Row style={{fontSize: '1.25em', color: 'gray'}}>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={6} className="text-left">Activities:</Col>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={4}>
                                <input type='text' value={this.state.numberOfSeminarTests} onChange={this.onSeminarTestsChange}/>
                            </Col>
                            <Col style={{fontSize: '1em', color: 'gray'}} md={1}><Button
                                onClick={this.openSeminarTestsPopup}>
                                <i className="fa fa-cog" aria-hidden="true"/>
                            </Button>
                            </Col>
                        </Row>
                    </Col>
                    }
                    {
                        this.state.hasSeminar &&
                        <Col style={{fontSize: '1.25em', color: 'gray'}} md={6}>
                            Professors:
                            <Row>
                                {this.state.hasSeminar  &&
                                <div>
                                    {/* Professors list component for labs*/}
                                    Professor1 <br/>
                                    Professor2 <br/>
                                    Professor3
                                </div>
                                }
                            </Row>
                        </Col>
                    }
                </Row>
                <hr/>
                <Row className="show-grid text-center">
                    <Col style={{fontSize: '1.5em', color: 'gray'}} md={12}>
                        Students
                    </Col>
                    <Col style={{fontSize: '1.25em', color: 'gray'}} md={12}>
                        Students list component
                    </Col>
                </Row>
                <br/><br/>
                <hr/>
                <Row className="show-grid text-center">
                    <Col style={{fontSize: '1.5em', color: 'gray'}} md={4}>Written Exam</Col>
                    <Col style={{fontSize: '1.25em', color: 'gray'}} md={4}>Percentage:</Col>
                    <Col style={{fontSize: '1em', color: 'gray'}} md={1}>
                        <input type='text' value={this.state.examWrittenPercentage} onChange={this.onWrittenExamPercentageChange}/>
                    </Col>
                </Row>

                <Row className="show-grid text-center">
                    <Col style={{fontSize: '1.5em', color: 'gray'}} md={4}>Practical Exam</Col>
                    <Col style={{fontSize: '1.25em', color: 'gray'}} md={4}>Percentage:</Col>
                    <Col style={{fontSize: '1em', color: 'gray'}} md={1}>
                        <input type='text' value={this.state.examPracticalPercentage} onChange={this.onPracticalExamPercentageChange}/>
                    </Col>
                </Row>
                <br/><br/>
                <Button className="btn btn-success" onClick={this.submit}>Submit</Button>
                <Popup isVisible={this.state.isCoursePopupVisible} sendToParent={this.getFromChildCourse}
                       onClose={this.closeCoursePopup} componentType={this.state.popupCourseComponentType}
                       tests={this.state.courseTests} percentages={this.state.coursePercentages}
                       weeks={this.state.courseWeeks} refresh={this.onCourseTestsChange}/>
                <Popup isVisible={this.state.isSeminarPopupVisible} sendToParent={this.getFromChildSeminar}
                       onClose={this.closeSeminarPopup} componentType={this.state.popupSeminarComponentType}
                       tests={this.state.seminarTests} percentages={this.state.seminarPercentages}
                       weeks={this.state.seminarWeeks} refresh={this.onSeminarTestsChange}/>
                <Popup isVisible={this.state.isLabPopupVisible} sendToParent={this.getFromChildLab}
                       onClose={this.closeLabPopup} componentType={this.state.popupLabComponentType}
                       tests={this.state.labTests} percentages={this.state.labPercentages} weeks={this.state.labWeeks}
                       refresh={this.onLabTestsChange}/>
                <br/><br/>
            </Grid>

        );
    }
}

const mapStateToProps = (state: any) => ({
    courseDetail: Object.assign({}, state.app.courseConfig)
});
export default connect(mapStateToProps)(CourseDetail);


