import * as React from "react";
import {Component} from "react";

import './CourseDetail.css';

import { Grid, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';

class CourseDetail extends Component<any, any> {
    private details: any;
    constructor(props: any) {
        super(props);    
        this.details = props.detail  
        this.renderGroups= this.renderGroups.bind(this);
        console.log(this.details)
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
        console.log(event)

        


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
                console.log(this.details.section.nrGroups);
                for (let i = 1; i <= this.details.section.nrGroups; i++){
                    
                    console.log('9'+year.toString()+i.toString())
                    groups.push('9'+year.toString()+i.toString())
                    console.log('english')
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
        <Col style={{fontSize: '1.5em', color:'gray'}} md={2}>Course</Col>
        <Col style={{fontSize: '1.25em', color:'gray'}} md={4}>
        Number: <input type='text' defaultValue={this.details.number} size={1} onKeyPress={(event)=>this.handleKeyPress(event, 'number')} />
        </Col>
        <Col style={{fontSize: '1.25em', color:'gray'}} md={4}>
        Hours: <input type='text' defaultValue = {this.details.hours} size={1}/>
        </Col>
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
        <Col className="text-center" style={{fontSize: '1.5em', color:'gray'}} md={2}>Labs</Col>
        
        <Col style={{fontSize: '1em', color:'gray'}} md = {4}>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4}>Number:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' defaultValue = {this.details.labs.number} size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Hours:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' defaultValue = {this.details.labs.hours} size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Practicals:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' defaultValue = {this.details.labs.practicals} size={1}/></Col>
            </Row>
        </Col>

        <Col style={{fontSize: '1.25em', color:'gray'}} md={2} >
        Professors: 
        </Col>
            
        <Col style={{fontSize: '1em', color:'gray'}} >
        {/* Professors list component for labs*/}
        Professor1 <br/>
        Professor2 <br/>
        Professor3 
        </Col>
    </Row>
    <hr/>

    <Row className="show-grid">
        <Col className="text-center" style={{fontSize: '1.5em', color:'gray'}} md={2}>Seminars</Col>
        
        <Col style={{fontSize: '1em', color:'gray'}} md = {4}>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4}>Number:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' defaultValue = {this.details.seminars.number} size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Hours:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' defaultValue = {this.details.seminars.hours} size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Partials:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text'defaultValue = {this.details.seminars.partials}  size={1}/></Col>
            </Row>
        </Col>

        <Col style={{fontSize: '1.25em', color:'gray'}} md={2} >
        Professors:
        </Col>
       
        <Col style={{fontSize: '1em', color:'gray'}} >
          {/* Professors list component for seminars*/}
        Professor1 <br/>
        Professor2 
        </Col>
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

    
    </Grid>
        );
    }
}



export default CourseDetail;

