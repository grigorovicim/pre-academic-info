import * as React from "react";
import { Component } from "react";
// @ts-ignore
import {addProfessor} from "../actions/Professor.actions";

class AddProf extends Component<any, any>{
    private email: any;
    private setProfessorRef: any;

    constructor(props){
        super(props);
        this.state={
        };
        this.saveProfessor = this.saveProfessor.bind(this);
        this.setProfessorRef= (element:any) => {
            this.email = element;
        }
    }

    saveProfessor(){
        console.log("Saved professor with email:" + this.email.value + " to the course" + this.props.courseId);
        //ToDO call post to add professor
        //addProfessor({courseId: this.props.courseId, email:this.email.value});
        this.props.callback();
    }

    render(){
        return(
            <div>
                <p>Professor email address:</p>
                <input ref={this.setProfessorRef} type="text" placeholder="email"/><br/>
                <button onClick={this.saveProfessor}>Save</button><br/>
            </div>
        );
    }
}

export default AddProf;