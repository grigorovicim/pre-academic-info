
import userMale from '../images/edit-user-male.png';
import userFemale from '../images/edit-user-female.png';
import {Component} from "react";
import * as React from "react";

class ProfItem extends Component<any, any> {

    constructor(props: any){
        super(props);
        this.addProfessor = this.addProfessor.bind(this);
        this.deleteProfessor = this.deleteProfessor.bind(this);
    }

    addProfessor(){
        this.props.callback(this.props.professor);
    }

    deleteProfessor(){
        this.props.callback(this.props.professor);
    }

    render(){
        if(this.props.enrolled){
            return(<tr>
                <td>
                    <img src={userFemale} className="p-oval"/>
                </td>
                <td>{this.props.professor.Profile.first_name + " " + this.props.professor.Profile.last_name}</td>
                <td>{this.props.professor.Profile.personal_email}</td>
                <td>Informatica</td>
                <td>Engleza</td>
                <td>
                    <button onClick={this.deleteProfessor} className="p-delete-professor-button">X</button>
                </td>
            </tr>)
        }
        else
        {
            return(<tr>
                <td>
                    <img src={userMale} className="p-oval"/>
                </td>
                <td>{this.props.professor.Profile.first_name + " " + this.props.professor.Profile.last_name}</td>
                <td>{this.props.professor.Profile.personal_email}</td>
                <td>Informatica</td>
                <td>Engleza</td>
                <td>
                    <button onClick={this.addProfessor} className="p-add-professor-button">Add</button>
                </td>
            </tr>)
        }
    }



}


export default ProfItem;
