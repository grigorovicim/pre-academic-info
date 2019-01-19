import * as React from "react";
import {Component} from "react";
import 'font-awesome/css/font-awesome.min.css'
import './CourseDetail.css';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Popup from "../commons/Popup";
import {connect} from "react-redux";
import * as PropTypes from 'prop-types'; 
import { fetchCourseConfig } from '../actions/CourseConfig.actions';
import * as ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";

class CourseDetail extends Component<any, any> {
    static propTypes = {
        courseConfig: PropTypes.any
    };

    private details: any;
    private groups: any;
    
    constructor(props: any) {
        super(props); 

        this.groups = this.props.detail.groups;
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

        this.onWrittenExamPercentageChange =  this.onWrittenExamPercentageChange.bind(this)
        this.onPracticalExamPercentageChange =  this.onPracticalExamPercentageChange.bind(this)

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
            groups: this.props.detail.groups,
            rules: this.props.rules,
            description: this.details.description,

            coursePercentages: this.props.detail.courses.percentages,
            seminarPercentages: this.props.detail.seminars.percentages,
            labPercentages: this.props.detail.labs.percentages,

            courseNumber: this.props.detail.courses.number,
            seminarNumber: this.props.detail.seminars.number,
            labNumber: this.props.detail.labs.number,

            writtenExam: this.props.detail.courses.writtenExam,
            practicalExam: this.props.detail.courses.practicalExam,

            coursePercentage: this.props.detail.courses.percentage,
            labPercentage: this.props.detail.seminars.percentage,
            seminarPercentage: this.props.detail.labs.percentage,

            courseTests: this.props.detail.courses.tests,
            seminarTests: this.props.detail.seminars.tests,
            labTests: this.props.detail.labs.tests,

            courseWeeks: this.props.detail.courses.weeks,
            seminarWeeks: this.props.detail.seminars.weeks,
            labWeeks: this.props.detail.labs.weeks,

            isSeminarPopupVisible: false,
            isCoursePopupVisible: false,
            isLabPopupVisible: false,
        
            popupSeminarComponentType: null,
            popupCourseComponentType: null,
            popupLabComponentType: null,

            initial: 'state',
            isCourse: 1,
            isSeminar: 1,
            isLab: 1,
    //        year: Math.floor((this.groups[0] / 10 )% 10),
		}   
        this.details = props.detail  
      //  this.renderGroups= this.renderGroups.bind(this);
    }

    componentWillMount(){
        this.props.fetchCourseConfig(1); 
        console.log(this.props.courseDetail);
    }
    getFromChildSeminar(data: any){
        this.setState({seminarPercentages: data})
    }
    getFromChildLab(data: any){
        this.setState({labPercentages: data})
    }
    getFromChildCourse(data: any){
        this.setState({coursePercentages: data})
    }
    onCourseNumberChange(e : any) {
        this.setState({courseNumber : e.target.value})
    }
    onSeminarNumberChange(e : any) {
        this.setState({seminarNumber : e.target.value})
    }
    onLabNumberChange(e : any) {
        this.setState({labNumber : e.target.value})
    }
    onRulesChange(e: any){
        this.setState({rules: e.target.value})
    }
    onDescriptionChange(e: any){
        this.setState({description: e.target.value})
    }
    onCoursePercentageChange(e : any){
        this.setState({coursePercentage : e.target.value})
    }
    onSeminarPercentageChange(e : any){
        this.setState({seminarPercentage : e.target.value})
    }
    onLabPercentageChange(e : any){
        this.setState({labPercentage : e.target.value})
    }
    
    onCourseTestsChange(e : any) {
        this.setState({courseTests: e.target.value})
    }
    onSeminarTestsChange(e : any){
        this.setState({seminarTests: e.target.value})
    }
    onLabTestsChange(e : any){
        this.setState({labTests: e.target.value})
    }

    onPracticalExamPercentageChange(e: any){
        this.setState({practicalExam: e.target.value})
    }

    onWrittenExamPercentageChange(e: any){
        this.setState({writtenExam: e.target.value})
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
          labNumber: this.details.labs.tests,
		});
	  }
	  openSeminarTestsPopup(e: any) {
		e.stopPropagation();
		this.setState({
		  isSeminarPopupVisible: true,
          popupSeminarComponentType: 'p-seminar-tests',
          seminarNumber: this.details.seminars.tests,
        });
	  }
      openCourseTestsPopup(e: any) {
		e.stopPropagation();
		this.setState({
		  isCoursePopupVisible: true,
          popupCourseComponentType: 'p-course-tests',
          courseNumber: this.details.courses.tests,
		});
	  }
    //What tells us the field. Ex: what= "number" means that the handler
    //was called on the course number input field 
    handleKeyPress = (event: any, what: string) => {

        if(event.key === 'Enter'){

         
            switch(what){
                case ("number"):
                    
                    console.log(event.target.value)
                    break;
            }
        }
    }

    assignGroupToCourse = (element: any) =>
    {
        console.log(element)
        const nr = parseInt(element,10);
        if (this.groups.indexOf(nr) > -1){
            this.groups.splice(this.groups.indexOf(nr), 1);
        }else{
            this.groups.push(nr);
        }
        this.setState({groups : this.groups})
    }

    renderGroups() {
        //assume a course is assigned to a year of study (as in the db)
        let year = -1;
        if (this.groups !== undefined && this.groups !== []){
            year = Math.trunc(this.groups[0] / 10) % 10;
        }
        if (year === -1){
            return (<p>The year is not valid</p>);
        }
        const groups : string[] = []
        switch(this.details.section.name){
            case 'Romanian':
                for (let i = 1; i < this.details.section.nrGroups; i++){
                    groups.push('2'+year.toString()+i.toString())
                }
                break;

            case 'English':
                for (let i = 1; i <= this.details.section.nrGroups; i++){
                    groups.push('9'+year.toString()+i.toString())

                }
                break;
            case 'Hungarian':
                for (let i = 1; i <= this.details.section.nrGroups; i++){
                    groups.push('5'+year.toString()+i.toString())

                }
                break;
            case 'German':
                for (let i = 1; i < this.details.section.nrGroups; i++){
                    groups.push('7'+year.toString()+i.toString())
                }
                break;


        }
        const buttons: any = []


        groups.forEach(element => {
            if (this.groups.indexOf(parseInt(element,10))> -1){
                buttons.push(
                    <Button onClick={()=>this.assignGroupToCourse(element)} bsStyle="primary">&nbsp;{element}&nbsp;</Button>
                )
            }else {
                buttons.push(
                    <Button onClick={()=>this.assignGroupToCourse(element)} bsStyle="default">&nbsp;{element}&nbsp;</Button>
                )
            };

        });


        return (
            <ButtonToolbar>{buttons}</ButtonToolbar>

        );
    }

    submit(){
        console.log(this.state)
        return this.state;
    }
    render() {
    
        return (
            
		<Grid>
        <h1 className="text-center" style={{fontWeight: 600}}>{this.details.name}</h1>
        <h3 className="text-center" style={{color:"gray"}}>Course Configuration</h3>
        <br/>
        <br/>
        <br/>
      
        <Row className="show-grid text-center">
        <Col><input
              type="checkbox"
              defaultChecked={this.state.isCourse === 1}
              onChange={()=>{
              this.setState({isCourse : 1 - this.state.isCourse});
  
              }}
        /></Col>
        <Col style={{fontSize: '1.5em', color:'gray'}} md={2}>Course</Col>
        { this.state.isCourse === 1 &&
        <Col style={{fontSize: '1em', color:'gray'}} md = {4}>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4}>Number:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' value = {this.state.courseNumber} onChange={this.onCourseNumberChange} size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Percentage: </Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' value = {this.state.coursePercentage} onChange={this.onCoursePercentageChange} size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Activities:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {2} ><input type='text' value = {this.state.courseTests} onChange={this.onCourseTestsChange} size={1}/></Col>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><Button onClick={this.openCourseTestsPopup}><i className="fa fa-cog" aria-hidden="true"></i></Button></Col>
 
            </Row>
        </Col>
        }
    </Row>
        
    <hr/>
    <Row className="show-grid">
        <Col className="text-center" style={{fontSize: '1.5em', color:'gray'}} md={2}>Description</Col>
        <Col style={{fontSize: '1em', color:'gray'}} md={8}>
        <textarea defaultValue={this.details.description} onChange= {this.onDescriptionChange}></textarea>
        </Col>
    </Row>
    <hr/>
    <Row className="show-grid">
        <Col className="text-center" style={{fontSize: '1.5em', color:'gray'}} md={2}>Rules</Col>
        <Col style={{fontSize: '1em', color:'gray'}} md={8}>
        <textarea  className="form-control" defaultValue = {this.state.rules} onChange={this.onRulesChange}></textarea>
        </Col>
    </Row>
    <hr/>
    <Row className="show-grid">
    <Col><input
              type="checkbox"
              defaultChecked={this.state.isLab === 1}
              onChange={()=>{
              this.setState({isLab : 1 - this.state.isLab});
              }}
        /></Col>
        <Col className="text-center" style={{fontSize: '1.5em', color:'gray'}} md={2}>Labs</Col>
     { this.state.isLab === 1 && 
        <Col style={{fontSize: '1em', color:'gray'}} md = {4}>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4}>Number:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text'  value = {this.state.labNumber}  onChange={this.onLabNumberChange} size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Percentage: </Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' value = {this.state.labPercentage} onChange={this.onLabPercentageChange} size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Activities:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {2} ><input type='text' value = {this.state.labTests} onChange={this.onLabTestsChange}  size={1}/></Col>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><Button onClick={this.openLabTestsPopup}><i className="fa fa-cog" aria-hidden="true"></i></Button></Col>
            </Row>
        </Col>
      }
        { this.state.isLab === 1 &&
        <Col style={{fontSize: '1.25em', color:'gray'}} md={2} >
        Professors: 
        </Col>
        }
        { this.state.isLab === 1 && 
        <Col style={{fontSize: '1em', color:'gray'}} >
        {/* Professors list component for labs*/}
        Professor1 <br/>
        Professor2 <br/>
        Professor3 
        </Col>
        }
    </Row>
    <hr/>
    <Row className="show-grid">
    <Col><input
              type="checkbox"
              defaultChecked={this.state.isSeminar === 1}
              onChange={()=>{
              this.setState({isSeminar : 1 - this.state.isSeminar});
  
              }}
    /></Col>
        <Col className="text-center" style={{fontSize: '1.5em', color:'gray'}} md={2}>Seminars</Col>
        { this.state.isSeminar === 1 &&
        <Col style={{fontSize: '1em', color:'gray'}} md = {4}>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4}>Number:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' value = {this.state.seminarNumber}  onChange={this.onSeminarNumberChange} size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Percentage: </Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' value = {this.state.seminarPercentage} onChange={this.onSeminarPercentageChange} size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Activities:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {2} ><input type='text'value = {this.state.seminarTests} onChange={this.onSeminarTestsChange} size={1}/></Col>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><Button onClick={this.openSeminarTestsPopup}><i className="fa fa-cog" aria-hidden="true"></i></Button></Col>
            </Row>
        </Col>
        }
        {
         this.state.isSeminar === 1 &&
        <Col style={{fontSize: '1.25em', color:'gray'}} md={2} >
        Professors:
        </Col>
        }
        { this.state.isSeminar === 1 &&
        <Col style={{fontSize: '1em', color:'gray'}} >
          {/* Professors list component for seminars*/}
        Professor1 <br/>
        Professor2 
        </Col>
        }
    </Row>
    <hr/>
    {/*
    <Row className="show-grid text-center">
        <Col style={{fontSize: '1.5em', color:'gray'}} md={2}>Groups</Col>
        <Col style={{fontSize: '1.25em', color:'gray'}} md={8}>
               {this.renderGroups()} 
        </Col>
    </Row>
    <hr/>
    */}
    <Row className="show-grid text-center">
        <Col style={{fontSize: '1.5em', color:'gray'}} md={2}>Students</Col>
        <Col style={{fontSize: '1.25em', color:'gray'}} md={4}>

        Students list component
        </Col>
    </Row>
    <br/><br/>
    <hr/>
    <Row className="show-grid text-center">
    <Col style={{fontSize: '1.5em', color:'gray'}} md={2}>Written Exam</Col>
    <Col style = {{fontSize: '1.25em', color:'gray'}} md = {2}>Percentage:</Col> 
    <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' value = {this.state.writtenExamPercentage}  onChange={this.onWrittenExamPercentageChange} size={1}/></Col>  
   </Row>
    
   <Row className="show-grid text-center">
    <Col style={{fontSize: '1.5em', color:'gray'}} md={2}>Practical Exam</Col>
    <Col style = {{fontSize: '1.25em', color:'gray'}} md = {2}>Percentage:</Col> 
    <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' value = {this.state.practicalExamPercentage}  onChange={this.onPracticalExamPercentageChange} size={1}/></Col>  
   </Row>
    <br/><br/>
    <Button className="btn btn-success" onClick={this.submit}>Submit</Button>
	<Popup isVisible={this.state.isCoursePopupVisible} sendToParent = {this.getFromChildCourse} onClose={this.closeCoursePopup} componentType={this.state.popupCourseComponentType} tests={this.state.courseTests} percentages={this.state.coursePercentages} weeks = {this.state.courseWeeks} refresh={this.onCourseTestsChange}/>
    <Popup isVisible={this.state.isSeminarPopupVisible} sendToParent ={this.getFromChildSeminar} onClose={this.closeSeminarPopup} componentType={this.state.popupSeminarComponentType} tests={this.state.seminarTests} percentages={this.state.seminarPercentages} weeks = {this.state.seminarWeeks} refresh={this.onSeminarTestsChange}/>
    <Popup isVisible={this.state.isLabPopupVisible} sendToParent = {this.getFromChildLab} onClose={this.closeLabPopup} componentType={this.state.popupLabComponentType} tests={this.state.labTests} percentages={this.state.labPercentages} weeks = {this.state.labWeeks} refresh={this.onLabTestsChange}/>
    <br/><br/>
    </Grid>
    
        );
    }
}

const mapStateToProps = (state: any) => ({
    courseDetail: state.courseConfigReducer.courseConfig,
});
export default connect(mapStateToProps, {fetchCourseConfig})(CourseDetail);


