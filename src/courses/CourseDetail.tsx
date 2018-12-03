import * as React from "react";
import {Component} from "react";

import './CourseDetail.css';
import { Row, Col, Grid } from 'react-bootstrap';

class CourseDetail extends Component<any, any> {
    private details: any;
    constructor(props: any) {
        super(props);    
        this.details = props.detail  
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
        <Col style={{fontSize: '1.25em', color:'gray'}} md={4}>
        
        </Col>
    </Row>
    <hr/>
    <Row className="show-grid text-center">
        <Col style={{fontSize: '1.5em', color:'gray'}} md={2}>Students</Col>
        <Col style={{fontSize: '1.25em', color:'gray'}} md={4}>
        {/* Students list component */}
        </Col>
    </Row>
    <br/><br/>

    
    </Grid>
        );
    }
}

export default CourseDetail;

