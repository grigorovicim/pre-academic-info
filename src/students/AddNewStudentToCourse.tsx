/**
 * Component for adding a new student to a specific course. The student is added to the DB
 */

import * as React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import * as PropTypes from 'prop-types'; 

import { connect } from 'react-redux'; 
import { createStudent } from '../actions/Student.actions'; 
import { createStudentCourse } from '../actions/StudentCourse.actions'; 
import { createProfile } from '../actions/Profile.actions'; 
import { createUser } from '../actions/User.actions';
 
import './AddNewStudentToCourse.css';

class AddNewStudentToCourse extends Component<any, any> {

    static propTypes = {
        createProfile: PropTypes.func.isRequired,
        createStudent: PropTypes.func.isRequired,
        createStudentCourse: PropTypes.func.isRequired,
        createUser: PropTypes.func.isRequired,
        //students: PropTypes.array.isRequired,
      };

    constructor(props) {
        super(props);
        this.state = {
            studentIdValue:'',
            familyNameValue: '',
            firstNameValue:'',
            emailValue: '',
            messageValue: '',
            typeValue: '',
            sectionValue:'',
            yearValue: '',
            groupValue: '',
            studyLineValue: '', 
            courseIdValue: '', // the course to which the student will be assigned
            groups: [],
            years: [],
            courses: [],
            sections: [], //study lines
            usernameValue: '',
            cnpValue: '',
        };

        this.handleFamilyNameChange = this.handleFamilyNameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
        this.handleSectionChange = this.handleSectionChange.bind(this);
        this.handleStudentIdChange = this.handleStudentIdChange.bind(this);
        this.handleCourseChange = this.handleCourseChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleCnpChange = this.handleCnpChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // fetch('/section')
        //   .then(response => response.json())
        //   .then(sections => this.setState({ sections }));
        // console.log("got them sections");

    //     fetch('/group')
    //     .then(response => response.json())
    //     .then(groups => this.setState({ groups }));
    //   console.log("got them groups");

    //   fetch('/yearofstudy')
    //     .then(response => response.json())
    //     .then(years => this.setState({ years }));
    //   console.log("got them years");

      fetch('/course')
        .then(response => response.json())
        .then(courses => this.setState({ courses }));
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

    handleStudentIdChange(event){
        this.setState({studentIdValue: event.target.value});
    }

    handleCourseChange(event){
        this.setState({courseIdValue: event.target.value});
    }

    handleUsernameChange(event){
        this.setState({usernameValue: event.target.value});
    }

    handleCnpChange(event){
        this.setState({cnpValue: event.target.value});
    }

    handlePhoneChange(event){
        this.setState({phoneValue: event.target.value});
    }

    

    handleSubmit(event) {
        alert('A new student has been submitted: ' + this.state.familyNameValue + ' ' + this.state.firstNameValue + '\n'+
            this.state.emailValue + '\n' + this.state.messageValue + '\n' + 
            'type: ' + this.state.typeValue + '\n'+ 
            'year id: ' + this.state.yearValue + '\n' +
            'group id: ' + this.state.groupValue + '\n' +
            'section id: ' + this.state.sectionValue + '\n'+
            'course id: ' + this.state.courseIdValue
        );

        const student = {   
            "id": this.state.studentIdValue,
            "year_of_study": this.state.yearValue, //TODO this is not needed in the db!!!
            "createdAt":new Date(), 
            "updatedAt":new Date(), 
            "group_id": this.state.groupValue,
            "profile_id":this.state.studentIdValue, //TODO - create an actual profile
            "section_id": this.state.sectionValue, 
            "semester_id":1, // TODO 
            "year_of_study_id": this.state.yearValue
        }

        const studentCourse ={
           // "id":  parseInt(this.state.studentIdValue, 10), // TODO - generate randomly
            "id": this.state.studentIdValue,
           "year": this.state.yearValue,
            "createdAt":new Date(), 
            "updatedAt":new Date(), 
            // "course_id": parseInt(this.state.courseIdValue, 10),
            // "student_id": parseInt(this.state.studentIdValue, 10)
            "course_id": this.state.courseIdValue, 
            "student_id": this.state.studentIdValue,
        }

        const user = {
            "id": this.state.studentIdValue,
            "username":this.state.usernameValue,
            "password":this.state.usernameValue,
            "is_active":true,
            "createdAt":new Date(),
            "updatedAt":new Date(),
            "role_id":1 // the role id for students
        }

        const profile = {
            "id": this.state.studentIdValue,
            "first_name": this.state.firstNameValue ,
            "last_name": this.state.familyNameValue ,
            "personal_email": this.state.emailValue,
            "telephone_number": this.state.phoneValue,
            "gender": 1,
            "date_of_birth": new Date(),
            "cnp": this.state.cnpValue,
            "createdAt":new Date(),
            "updatedAt":new Date(),
            "user_id": this.state.studentIdValue
        }

        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
          }

          const sleep1 = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
          }
          const sleep2 = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
          }

         this.props.createUser(user);
         sleep(1000).then(() => {
            console.log("added user");
            
            this.props.createProfile(profile);
            sleep1(1000).then(() => {
                console.log("added profile");
                
                this.props.createStudent(student);
                sleep2(1000).then(()=>{
                    console.log("added student");
                    
                    this.props.createStudentCourse(studentCourse);
                })
              })
          })
        

        console.log(student.id);

        event.preventDefault();
    }

    render() {   
        return (
            <div className="add-new-student-container">

            <h1>Student details</h1>
            <form onSubmit={this.handleSubmit}>
                
                <div className="form-group">
                    <label>Student ID</label>
                    <input type="text" value={this.state.studentIdValue} className="form-control" placeholder="Student ID" onChange={this.handleStudentIdChange }></input>
                </div>

                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" value={this.state.firstNameValue} className="form-control" placeholder="First name"  onChange={this.handleFirstNameChange} ></input>
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" value={this.state.familyNameValue} className="form-control" placeholder="Last name"  onChange={this.handleFamilyNameChange} ></input>
                </div>

                <div className="form-group">
                    <label>Social Security Number</label>
                    <input type="text" value={this.state.cnpValue}  onChange={this.handleCnpChange} className="form-control" placeholder="CNP"   ></input>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="text" value={this.state.emailValue}  onChange={this.handleEmailChange} className="form-control" placeholder="Email"   ></input>
                </div>

                <div className="form-group">
                    <label>Phone number</label>
                    <input type="text" value={this.state.phoneValue}  onChange={this.handlePhoneChange} className="form-control" placeholder="Phone number"   ></input>
                </div>

                <div className="form-group">
                <label >Message</label>
                <textarea className="form-control" value={this.state.messageValue}  onChange={this.handleMessageChange} ></textarea>
                </div>

                Type:
                <select className="form-control form-control-sm" value={this.state.typeValue} onChange={this.handleTypeChange}> 
                    <option value="Erasmus">Erasmus</option>
                    <option value="Other year">Other year</option>
                    <option value="Optional">Optional</option>
                </select>
                Year:
                <select  className="form-control form-control-sm" value={this.state.yearValue} onChange={this.handleYearChange}> 
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                {/* <select value={this.state.yearValue} onChange={this.handleYearChange}>
                    {this.state.years.map((year) => <option defaultValue={year.id} key={year.id} value={year.id}>{year.label}</option>)}
                </select> */}
                {/* <label>Year:
                    <input type="number" min="1" max="5" value={this.state.yearValue} onChange={this.handleEmailChange} />
                </label> */}
                Group:
                <select  className="form-control form-control-sm"
                    value={this.state.groupValue}
                    onChange={this.handleGroupChange}  
                    // onChange={(e) => this.setState({groupValue: e.target.value})}
               >
                    {/* {this.state.groups.map((group) => <option key={group.id} value={group.id}>{group.group_number}</option>)} */}
                    <option value="1">931</option>
                    <option value="2">932</option>
                    <option value="3">933</option>
                    <option value="4">934</option>
                </select>
                Section:
                <select  className="form-control form-control-sm" value={this.state.sectionValue} onChange={this.handleSectionChange}>
                    {/* {this.state.sections.map((section) => <option key={section.id} value={section.id}>{section.name}</option>)} */}
                    <option value="1">IE</option>
                    <option value="2">IR</option>
                    <option value="3">IM</option>
                    <option value="4">IG</option>
                </select>
                
                Course:
                <select  className="form-control form-control-sm"
                    value={this.state.courseIdValue}
                    onChange={this.handleCourseChange}
               >
                    {this.state.courses.map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}
                </select>

                <div className="form-group">
                <label >Username</label>
                <input type="text" placeholder="Username" className="form-control"  value={this.state.usernameValue} onChange={this.handleUsernameChange} ></input>
                </div>

                <br></br>
                <input className="submit-round-button" type="submit" value="Send invitation" />
            </form>   
            
            </div>
     )
   }
 }


//  export default AddNewStudentToCourse;

const mapStateToProps = state => ({
    students: state.studentReducer.items, 
  });

export default connect(mapStateToProps, { createStudent, createStudentCourse, createUser, createProfile })( AddNewStudentToCourse );