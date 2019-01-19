import { FETCH_STUDENTS, NEW_STUDENT  } from './types';
import { FETCH_STUDENT_PROFILE } from './types';
import { FETCH_STUDENTS_ENROLLED} from './types';
import {FETCH_STUDENTS_NOT_ENROLLED} from './types';
import axios from 'axios';

export const fetchStudents = (courseId: any) => (dispatch:any) => {
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
        });
    console.log("fetch complete");
    
};

export const fetchStudentsEnrolled = (courseId: any) => (dispatch:any) => {
    axios.get('/student/course/'+courseId)
        .then(res =>{

            dispatch({
                type: FETCH_STUDENTS_ENROLLED,
                payload: res.data
            })})
        .catch(error => {
            console.log(error)
        });
};


export const fetchStudentsNotEnrolled = (courseId: any) => (dispatch:any) => {
    axios.get('/student/not-enrolled/course/'+courseId)
        .then(res =>{

            dispatch({
                type: FETCH_STUDENTS_NOT_ENROLLED,
                payload: res.data
            })})
        .catch(error => {
            console.log(error)
        });
};

export const fetchProfileForStudent = (studentId: any) => (dispatch:any) => {
    // console.log("fetching profile for student...");

    axios.get('/student/profile/'+ studentId)
    .then(res =>{
        dispatch({
            type: FETCH_STUDENT_PROFILE,
            payload: res.data[0]    //because there is ONLY 1 profile corresponding to the student
        })})
        .catch(error => {
            console.log(error)
        });
    // console.log("fetch complete");
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