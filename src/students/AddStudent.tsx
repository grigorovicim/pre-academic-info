import * as React from "react";
import { Component } from "react";

class AddStudent extends Component<any, any>{
    private email: any;
    private setStudentRef: any;

    constructor(props){
        super(props);
        this.state={
        };
        this.saveStudent = this.saveStudent.bind(this);
        this.setStudentRef= (element:any) => {
            this.email = element;
        }
    }

    saveStudent(){
        console.log("Saved student with email:" + this.email.value + " to the course" + this.props.courseId);
        //ToDO call post to add student
        this.props.callback();
    }

    render(){
        return(
            <div>
                <p>Student email address:</p>
                <input ref={this.setStudentRef} type="text" placeholder="email"/><br/>
                <button onClick={this.saveStudent}>Add student</button><br/>
            </div>
        );
    }
}

export default AddStudent;