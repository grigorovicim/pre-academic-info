/**
 * Component for adding a new student to a specific course. The student is added to the DB
 */

 import * as React from 'react';
 import { Component } from 'react';
 import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
 
class AddNewStudentToCourse extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            familyNameValue: '',
            firstNameValue:'',
            emailValue: '',
            messageValue: '',
            typeValue: '',
            sectionValue:'',
            yearValue: '',
            groupValue: '',
            studyLineValue: '', 
            groups: [],
            years: [],
            sections: [] //study lines
        };

        this.handleFamilyNameChange = this.handleFamilyNameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
        this.handleSectionChange = this.handleSectionChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('/section')
          .then(response => response.json())
          .then(sections => this.setState({ sections }));
        console.log("got them sections");

        fetch('/group')
        .then(response => response.json())
        .then(groups => this.setState({ groups }));
      console.log("got them groups");

      fetch('/yearofstudy')
        .then(response => response.json())
        .then(years => this.setState({ years }));
      console.log("got them years");
    }

    handleFamilyNameChange(event) {
        this.setState({familyNameValue: event.target.value});
    }

    handleFirstNameChange(event) {
        this.setState({firstNameValue: event.target.value});
    }
    
    handleEmailChange(event) {
        this.setState({emailValue: event.target.value});
    }
    
    handleMessageChange(event){
        this.setState({messageValue: event.target.value});
    }

    handleTypeChange(event){
        this.setState({typeValue: event.target.value});
    }
    
    handleGroupChange(event){
        this.setState({groupValue: event.target.value});
    }

    handleYearChange(event){
        this.setState({yearValue: event.target.value});
    }

    handleSectionChange(event){
        this.setState({sectionValue: event.target.value});
    }

    handleSubmit(event) {
        alert('A new student has been submitted: ' + this.state.familyNameValue + ' ' + this.state.firstNameValue + '\n'+
            this.state.emailValue + '\n' + this.state.messageValue + '\n' + 
            'type: ' + this.state.typeValue + '\n'+ 
            'year id: ' + this.state.yearValue + '\n' +
            'group id: ' + this.state.groupValue + '\n' +
            'section id: ' + this.state.sectionValue
        );
        event.preventDefault();
    }

    render() {   
        return (
            <div className="container">
            <form onSubmit={this.handleSubmit}>
                <label>First Name:
                    <input type="text" value={this.state.firstNameValue} onChange={this.handleFirstNameChange} />
                </label>
                <br/>
                <label>Family Name:
                    <input type="text" value={this.state.familyNameValue} onChange={this.handleFamilyNameChange} />
                </label><br/>
                <br/>
                <label>Email: 
                    <input type="text" value={this.state.emailValue}  onChange={this.handleEmailChange} />
                </label>
                <br/>
                <label>Message:
                    <textarea value={this.state.messageValue}  onChange={this.handleMessageChange} />
                </label>
                <br/>
                {/* TODO get the actual types from the DB */}
                Type:
                <select value={this.state.typeValue} onChange={this.handleTypeChange}> 
                    <option value="Erasmus">Erasmus</option>
                    <option value="Other year">Other year</option>
                    <option value="Optional">Optional</option>
                </select>
                <br/>
                Year:
                <select value={this.state.yearValue} onChange={this.handleYearChange}>
                    {this.state.years.map((year) => <option defaultValue={year.id} key={year.id} value={year.id}>{year.label}</option>)}
                </select>
                {/* <label>Year:
                    <input type="number" min="1" max="5" value={this.state.yearValue} onChange={this.handleEmailChange} />
                </label> */}
                <br/>
                Group:
                <select 
                    value={this.state.groupValue}
                    onChange={this.handleGroupChange}  
                    // onChange={(e) => this.setState({groupValue: e.target.value})}
               >
                    {this.state.groups.map((group) => <option key={group.id} value={group.id}>{group.group_number}</option>)}
                </select>
                <br/>
                Section:
                <select value={this.state.sectionValue} onChange={this.handleSectionChange}>
                    {this.state.sections.map((section) => <option key={section.id} value={section.id}>{section.name}</option>)}
                </select>
                <br/>
                <input type="submit" value="Send invitation" />
            </form>   
            </div>
     )
   }
 }

 export default AddNewStudentToCourse;
 