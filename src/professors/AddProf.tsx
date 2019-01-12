import * as React from "react";
import { Component } from "react";
import './AddProf.css'
import searchLogo from '../images/search.png';
import userFemale from '../images/edit-user-female.png';
import userMale from '../images/edit-user-male.png';
// @ts-ignore
import {addProfessor} from "../actions/Professor.actions";

class AddProf extends Component<any, any>{
    private searchKeyword: any;
    private setProfessorRef: any;

    constructor(props){
        super(props);
        this.state={
        };
        this.done = this.done.bind(this);
        this.getFilteredProfessors = this.getFilteredProfessors.bind(this);
        this.removeProfessor = this.removeProfessor.bind(this);
        this.addProfessor = this.addProfessor.bind(this);
        this.setProfessorRef= (element:any) => {
            this.searchKeyword = element;
        }
    }

    getFilteredProfessors(){
        console.log("Filter professors by" + this.searchKeyword)
    }

    done(){
        this.props.callback();
    }

    removeProfessor(){
        console.log("Professor was removed");
    }

    addProfessor(){
        console.log("Professor was added");
    }

    render(){
        return(
            <div>
                <div className="p-header-wrapper">
                    <div className="p-course-title">
                        Design patterns
                    </div>
                    <div className="p-course-configuration">
                        Course configuration
                    </div>
                    <div className="p-add-professor-header">
                        Add professor
                    </div>
                </div>

                <div className="p-search-container">
                    <div className="p-search-professor">
                        Search professor:
                    </div>
                    <div>
                        <input ref={this.setProfessorRef} type="text" placeholder="Search by name" className="p-search-bar"/>
                        <img src={searchLogo} className="p-search-logo"/>
                    </div>
                </div>

                <div className="p-professors-container">
                    <div className="p-professors-list-container">
                        <table className="p-professors-table">
                            <tr>
                                <th/>
                                <th>Name</th>
                                <th>Email</th>
                                <th/>
                            </tr>
                            <tr>
                                <td>
                                    <img src={userFemale} className="p-oval"/>
                                </td>
                                <td>Maria</td>
                                <td>umie2239@cs.ubbcluj.ro</td>
                                <td>
                                    <button onClick={this.removeProfessor} className="p-remove-button">X</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <img src={userMale} className="p-oval"/>
                                </td>
                                <td>Gaceanu Radu</td>
                                <td>umie2239@cs.ubbcluj.ro</td>
                                <td>
                                    <button onClick={this.addProfessor} className="p-add-professor-button">Add</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <img src={userMale} className="p-oval"/>
                                </td>
                                <td>Motogna Simona</td>
                                <td>umie2239@cs.ubbcluj.ro</td>
                                <td>
                                    <button onClick={this.addProfessor} className="p-add-professor-button">Add</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <img src={userMale} className="p-oval"/>
                                </td>
                                <td>Pop Andreea</td>
                                <td>umie2239@cs.ubbcluj.ro</td>
                                <td>
                                    <button onClick={this.removeProfessor} className="p-remove-button">X</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <img src={userMale} className="p-oval"/>
                                </td>
                                <td>Boian rares</td>
                                <td>umie2239@cs.ubbcluj.ro</td>
                                <td>
                                    <button onClick={this.addProfessor} className="p-add-professor-button">Add</button>
                                </td>
                            </tr>

                        </table>
                    </div>
                </div>

                <div className="p-button-container">
                <button onClick={this.done} className="p-done-button">Done</button><br/>
                </div>
            </div>
        );
    }
}

export default AddProf;