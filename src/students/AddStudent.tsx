import * as React from "react";
import { Component } from "react";
import searchLogo from '../images/search.png';
import userFemale from '../images/edit-user-female.png';
import userMale from '../images/edit-user-male.png';

class AddStudent extends Component<any, any>{
    private searchKeyword: any;
    private setStudentRef: any;

    constructor(props){
        super(props);
        this.state={
        };
        this.addStudent = this.addStudent.bind(this);
        this.removeStudent = this.removeStudent.bind(this);
        this.done = this.done.bind(this);
        this.getFilteredStudents = this.getFilteredStudents.bind(this);
        this.setStudentRef= (element:any) => {
            this.searchKeyword = element;
        }
    }

    getFilteredStudents(){
        console.log("Filter students by" + this.searchKeyword)
    }

    done(){
        this.props.callback();
    }

    removeStudent(){
        console.log("Student was removed");
    }

    addStudent(){
        console.log("Student was added");
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
                        Add student
                    </div>
                </div>

                <div className="p-search-container">
                    <div className="p-search-professor">
                        Search student:
                    </div>
                    <div>
                        <input ref={this.setStudentRef} type="text" placeholder="Search by name" className="p-search-bar"/>
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
                                <th>Faculty</th>
                                <th>Line</th>
                                <th>Year</th>
                                <th/>
                            </tr>
                            <tr>
                                <td>
                                    <img src={userFemale} className="p-oval"/>
                                </td>
                                <td>Ungur Maria</td>
                                <td>umie2239@cs.ubbcluj.ro</td>
                                <td>Informatica</td>
                                <td>Engleza</td>
                                <td>1</td>
                                <td>
                                    <button onClick={this.removeStudent} className="p-remove-button">X</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <img src={userFemale} className="p-oval"/>
                                </td>
                                <td>Grigorovici Monica</td>
                                <td>umie2239@cs.ubbcluj.ro</td>
                                <td>Informatica</td>
                                <td>Engleza</td>
                                <td>1</td>
                                <td>
                                    <button onClick={this.addStudent} className="p-add-professor-button">Add</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <img src={userMale} className="p-oval"/>
                                </td>
                                <td>Tamas Florin</td>
                                <td>umie2239@cs.ubbcluj.ro</td>
                                <td>Informatica</td>
                                <td>Engleza</td>
                                <td>1</td>
                                <td>
                                    <button onClick={this.addStudent} className="p-add-professor-button">Add</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <img src={userFemale} className="p-oval"/>
                                </td>
                                <td>Gae Andrada</td>
                                <td>umie2239@cs.ubbcluj.ro</td>
                                <td>Informatica</td>
                                <td>Engleza</td>
                                <td>1</td>
                                <td>
                                    <button onClick={this.removeStudent} className="p-remove-button">X</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <img src={userFemale} className="p-oval"/>
                                </td>
                                <td>Ungur Nicoleta</td>
                                <td>umie2239@cs.ubbcluj.ro</td>
                                <td>Informatica</td>
                                <td>Engleza</td>
                                <td>1</td>
                                <td>
                                    <button onClick={this.addStudent} className="p-add-professor-button">Add</button>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <img src={userMale} className="p-oval"/>
                                </td>
                                <td>Grigore Dragos</td>
                                <td>umie2239@cs.ubbcluj.ro</td>
                                <td>Informatica</td>
                                <td>Engleza</td>
                                <td>1</td>
                                <td>
                                    <button onClick={this.addStudent} className="p-add-professor-button">Add</button>
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

export default AddStudent;