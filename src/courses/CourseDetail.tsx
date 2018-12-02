import * as React from "react";
import {Component} from "react";

import './CourseDetail.css';
import { Row, Col, Grid } from 'react-bootstrap';

class CourseDetail extends Component<any, any> {

    constructor(props: any) {
        super(props);        
    }

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
        <h1 className="text-center" style={{fontWeight: 600}}>Design Patterns</h1>
        <h3 className="text-center" style={{color:"gray"}}>Course Configuration</h3>
        <br/>
        <br/>
        <br/>
    <Row className="show-grid text-center">
        <Col style={{fontSize: '1.5em', color:'gray'}} md={2}>Course</Col>
        <Col style={{fontSize: '1.25em', color:'gray'}} md={4}>
        Number: <input type='text' size={1} onKeyPress={(event)=>this.handleKeyPress(event, 'number')} />
        </Col>
        <Col style={{fontSize: '1.25em', color:'gray'}} md={4}>
        Hours: <input type='text' size={1}/>
        </Col>
    </Row>
    <hr/>
    <Row className="show-grid">
        <Col className="text-center" style={{fontSize: '1.5em', color:'gray'}} md={2}>Description</Col>
        <Col style={{fontSize: '1em', color:'gray'}} md={8}>
        I should have mentioned that the size attribute isn't a precise method of sizing: according to the HTML specification, it should refer to the number of characters of the current font the input will be able to display at once.
        However, unless the font specified is a fixed-width/monospace font, this is not a guarantee that the specified number of characters will actually be visible; in most fonts, different characters will be different widths. This question has some good answers relating to t
        </Col>
    </Row>
    <hr/>
    <Row className="show-grid">
        <Col className="text-center" style={{fontSize: '1.5em', color:'gray'}} md={2}>Rules</Col>
        <Col style={{fontSize: '1em', color:'gray'}} md={8}>
        I should have mentioned that the size attribute isn't a precise method of sizing: according to the HTML specification, it should refer to the number of characters of the current font the input will be able to display at once.
        However, unless the font specified is a fixed-width/monospace font, this is not a guarantee that the specified number of characters will actually be visible; in most fonts, different characters will be different widths. This question has some good answers relating to t
        </Col>
    </Row>
    <hr/>
    <Row className="show-grid">
        <Col className="text-center" style={{fontSize: '1.5em', color:'gray'}} md={2}>Labs</Col>
        
        <Col style={{fontSize: '1em', color:'gray'}} md = {4}>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4}>Number:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Hours:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Practicals:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' size={1}/></Col>
            </Row>
        </Col>

        <Col style={{fontSize: '1.25em', color:'gray'}} md={2} >
        Professors:
        </Col>
       
        <Col style={{fontSize: '1em', color:'gray'}} >
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
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Hours:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' size={1}/></Col>
            </Row>
            <Row style={{fontSize: '1.25em', color:'gray'}}>
                <Col style = {{fontSize: '1em', color:'gray'}} md = {4} >Partials:</Col> 
                <Col style = {{fontSize: '1em', color:'gray'}} md = {1} ><input type='text' size={1}/></Col>
            </Row>
        </Col>

        <Col style={{fontSize: '1.25em', color:'gray'}} md={2} >
        Professors:
        </Col>
       
        <Col style={{fontSize: '1em', color:'gray'}} >
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
        
        </Col>
    </Row>
    <br/><br/>

    
    </Grid>
        );
    }
}

export default CourseDetail;