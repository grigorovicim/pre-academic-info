
import userMale from '../images/edit-user-male.png';
import userFemale from '../images/edit-user-female.png';
import {Component} from "react";
import * as React from "react";

class StudentItem extends Component<any, any> {

    constructor(props: any){
        super(props);
        this.addStudent = this.addStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    addStudent(){
        this.props.callback(this.props.student);
    }

    deleteStudent(){
        this.props.callback(this.props.student);
    }

    render(){
        if(this.props.enrolled){
            return(<tr>
                <td>
                    <img src={userFemale} className="p-oval"/>
                </td>
                <td>{this.props.student.Profile.first_name + " " + this.props.student.Profile.last_name}</td>
                <td>{this.props.student.Profile.personal_email}</td>
                <td>Informatica</td>
                <td>Engleza</td>
                <td>{this.props.student.year_of_study}</td>
                <td>
                    <button onClick={this.deleteStudent} className="p-delete-professor-button">X</button>
                </td>
            </tr>)
        }
        else
        {
            return(<tr>
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
            </tr>)
        }
    }



}


export default StudentItem;
