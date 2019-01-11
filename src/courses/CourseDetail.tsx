import * as React from "react";
import {Component} from "react";
import 'font-awesome/css/font-awesome.min.css'
import './CourseDetail.css';
import { Grid, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import Popup from "../commons/Popup";

class CourseDetail extends Component<any, any> {
    
    private details: any;
    
    constructor(props: any) {
		super(props); 
        this.openLabTestsPopup = this.openLabTestsPopup.bind(this);
        this.openSeminarTestsPopup = this.openSeminarTestsPopup.bind(this);
        this.openCourseTestsPopup = this.openCourseTestsPopup.bind(this);

        this.onCourseNumberChange = this.onCourseNumberChange.bind(this);
        this.onSeminarNumberChange = this.onSeminarNumberChange.bind(this);
        this.onLabNumberChange = this.onLabNumberChange.bind(this);

        this.onCourseTestsChange = this.onCourseTestsChange.bind(this);
        this.onSeminarTestsChange = this.onSeminarTestsChange.bind(this);
        this.onLabTestsChange = this.onLabTestsChange.bind(this);

        this.closeLabPopup = this.closeLabPopup.bind(this);
        this.closeSeminarPopup = this.closeSeminarPopup.bind(this);
        this.closeCoursePopup = this.closeCoursePopup.bind(this);
        //alert(this.props.detail.courses.number)
       
        this.state = {
            
            courseNumber: this.props.detail.courses.number,
            seminarNumber: this.props.detail.seminars.number,
            labNumber: this.props.detail.labs.number,

            courseTests: this.props.detail.courses.tests,
            seminarTests: this.props.detail.seminars.tests,
            labTests: this.props.detail.labs.tests,

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
		}   
        this.details = props.detail  
        this.renderGroups= this.renderGroups.bind(this);
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
    
    
    onCourseTestsChange(e : any) {
        this.setState({courseTests: e.target.value})
    }
    onSeminarTestsChange(e : any){
        this.setState({seminarTests: e.target.value})
    }
    onLabTestsChange(e : any){
        this.setState({labTests: e.target.value})
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
    assignGroupToCourse = (event:any) =>
    {
        //here you may handle the problem of adding a group to the course
    }  

    renderGroups() {
        //assume a course is assigned to a year of study (as in the db)
        let year = -1;
        if (this.details.groups !== undefined && this.details.groups !== []){
        year = Math.trunc(this.details.groups[0] / 10) % 10;
        }
        if (year === -1){
            return (<p>The year is not valid</p>);
        }
        const groups = []
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
            if (this.details.groups.indexOf(parseInt(element,10))> -1){
                buttons.push(
                    <Button onClick={this.assignGroupToCourse} bsStyle="primary">&nbsp;{element}&nbsp;</Button>
                     )
            }else {
                buttons.push(
                <Button onClick={this.assignGroupToCourse} bsStyle="default">&nbsp;{element}&nbsp;</Button>
                )
            };
                      
        });
     
   
        return (
            <ButtonToolbar>{buttons}</ButtonToolbar>

        );
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
            {/*<Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Hours:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' value = {this.state.courseHours} onChange={this.onCourseHoursChange} size={1}/></Col>
            </Row>*/}
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Tests:</Col> 
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
        {this.details.description}
        </Col>
    </Row>
    <hr/>
    <Row className="show-grid">
        <Col className="text-center" style={{fontSize: '1.5em', color:'gray'}} md={2}>Rules</Col>
        <Col style={{fontSize: '1em', color:'gray'}} md={8}>
        {this.details.rules}
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
            {/* <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Hours:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' defaultValue = {this.details.labs.hours} size={1}/></Col>
            </Row>*/}
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Tests:</Col> 
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
            {/*<Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Hours:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' defaultValue = {this.details.seminars.hours}  onChange={this.onSeminarHoursChange} size={1}/></Col>
            </Row>*/}
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Tests:</Col> 
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
    <Row className="show-grid text-center">
        <Col style={{fontSize: '1.5em', color:'gray'}} md={2}>Groups</Col>
        <Col style={{fontSize: '1.25em', color:'gray'}} md={8}>
               {this.renderGroups()} 
        </Col>
    </Row>
    <hr/>
    <Row className="show-grid text-center">
        <Col style={{fontSize: '1.5em', color:'gray'}} md={2}>Students</Col>
        <Col style={{fontSize: '1.25em', color:'gray'}} md={4}>

        Students list component
        </Col>
    </Row>
    <br/><br/>
	<Popup isVisible={this.state.isCoursePopupVisible} onClose={this.closeCoursePopup} componentType={this.state.popupCourseComponentType} tests={this.state.courseTests} percentages={this.state.coursePercentages} refresh={this.onCourseTestsChange}/>
    <Popup isVisible={this.state.isSeminarPopupVisible} onClose={this.closeSeminarPopup} componentType={this.state.popupSeminarComponentType} tests={this.state.seminarTests} percentages={this.state.seminarPercentages} refresh={this.onSeminarTestsChange}/>
    <Popup isVisible={this.state.isLabPopupVisible} onClose={this.closeLabPopup} componentType={this.state.popupLabComponentType} tests={this.state.labTests} percentages={this.state.labPercentages} refresh={this.onLabTestsChange}/>
    </Grid>
    
        );
    }
}



export default CourseDetail;

