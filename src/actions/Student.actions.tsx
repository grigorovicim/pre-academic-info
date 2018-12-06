import { FETCH_STUDENTS, NEW_STUDENT  } from './types';
import axios from 'axios';

export const fetchStudents = (courseId: any) => dispatch => {
    console.log("fetching students...");

    axios.get('/student/course/'+courseId)
    .then(res =>{
        console.log("doing something");
        
        dispatch({
            type: FETCH_STUDENTS,
            payload: res.data
        })}) 
        .catch(error => {
            console.log(error)
        });;
};

export const createStudent = postData => dispatch => {
    fetch('/student', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(student =>
        dispatch({
          type: NEW_STUDENT,
          payload: student
        })
      );
  };