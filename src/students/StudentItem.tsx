
import userMale from '../images/edit-user-male.png';
import {Component} from "react";
import * as React from "react";

class StudentItem extends Component<any, any> {

    constructor(props: any){
        super(props);
    }

    addStudent(){
        //add student with studentId to course with courseId backend
    }

    render(){
        return(<div>
                    <td>
                        <img src={userMale} className="p-oval"/>
                    </td>
                    <td>{this.props.student.Profile.first_name + " " + this.props.student.Profile.last_name}</td>
                    <td>{this.props.student.Profile.personal_email}</td>
                    <td>Informatica</td>
                    <td>Engleza</td>
                    <td>{this.props.student.year_of_study}</td>
                    <td>
                        <button onClick={this.addStudent} className="p-add-professor-button">Add</button>
                    </td>
                </div>)
    }

}


export default StudentItem;
