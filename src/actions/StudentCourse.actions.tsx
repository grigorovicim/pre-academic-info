import { FETCH_STUDENT_COURSES,NEW_STUDENT_COURSE } from './types';
import axios from 'axios';

export const fetchStudentCourses = () => dispatch => {
    console.log("fetching students...");

    axios.get('/studentcourse')
    .then(res =>{
        dispatch({
            type: FETCH_STUDENT_COURSES,
            payload: res.data
        })}) 
        .catch(error => {
            console.log(error)
        });
};

export const createStudentCourse = postData => dispatch => {
    fetch('/studentcourse', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(studentCourse =>
        dispatch({
          type: NEW_STUDENT_COURSE,
          payload: studentCourse
        })
      )
      .catch(error => {
        console.log(error)
      })
      ;
  };