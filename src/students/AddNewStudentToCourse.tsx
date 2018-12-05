/**
 * Component for adding a new student to a specific course. The student is added to the DB
 */

 import * as React from 'react';
 import { Component } from 'react';
 import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
 
 export default class AddNewStudentToCourse extends Component {
   render() {   
     return (
       <div>
         First name: <input type="text" name="first-name"/><br/>
         Family name: <input type="text" name="family-name"/><br/>
         Email: <input type="text" name="email"/><br/>
         Message: <textarea name="message-text" id="message"></textarea><br/>
         Type: <br/>
         Year:
        <br/>
         Details: <input type="text" name="details"/>
         Group: <br/>
         Study line: <br/>
         
       </div>
     )
   }
 }
 