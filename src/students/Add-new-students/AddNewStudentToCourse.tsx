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
            yearValue: '',
            groupValue: '',
            studyLineValue: '', 
            sections: []
        };
        this.handleFamilyNameChange = this.handleFamilyNameChange.bind(this);
        this.handleFirstNameChange = this.handleFamilyNameChange.bind(this);
        this.handleEmailChange = this.handleFamilyNameChange.bind(this);
        this.handleMessageChange = this.handleFamilyNameChange.bind(this);
        this.handleTypeChange = this.handleFamilyNameChange.bind(this);

        


            this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount() {
    //     let initialSections = [];
    //     fetch('/section')
    //         .then(response => {
    //             return response.json();
    //         }).then(data => {
    //             initialSections = data.results.map((section) => {
    //             return section
    //         });
    //         console.log(initialSections);
    //         this.setState({
    //             sections: initialSections,
    //         });
    //     });
    // }

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
        this.setState({messageValue: event.target.value});
    }

    handleSubmit(event) {
        alert('A new student has been submitted: ' + this.state.familyNameValue);
        event.preventDefault();
    }

    render() {   
        return (
            <div className="container">
            <form onSubmit={this.handleSubmit}>
                <label>Family Name:
                    <input type="text" value={this.state.familyNameValue} onChange={this.handleFamilyNameChange} />
                </label><br/>
                <br/>
                <label>First Name:
                    <input type="text" value={this.state.firstNameValue} onChange={this.handleFirstNameChange} />
                </label>
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
                <label>Year:
                    <input type="number" min="1" max="5" value={this.state.yearValue} onChange={this.handleEmailChange} />
                </label>
                <br/>
                {/* TODO get the actual groups from the DB */}
                Group:
                <select value={this.state.typeValue} onChange={this.handleTypeChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
                <br/>
                {/* TODO get the actual study lines from the DB */}
                Study line:
                <select value={this.state.typeValue} onChange={this.handleTypeChange}>
                    <option value="CS - English">1</option>
                    <option value="CS - German">2</option>
                </select>
                <br/>
                <input type="submit" value="Send invitation" />
            </form>   
            </div>

    //    <div>
    //      First name: <input type="text" name="first-name"/><br/>
    //      Family name: <input type="text" name="family-name"/><br/>
    //      Email: <input type="text" name="email"/><br/>
    //      Message: <textarea name="message-text" id="message"></textarea><br/>
    //      Type: <br/>
    //      Year:
    //     <br/>
    //      Details: <input type="text" name="details"/><br/>
    //      Group: <br/>
    //      Study line: <br/>
         
    //    </div>
     )
   }
 }

 export default AddNewStudentToCourse;
 