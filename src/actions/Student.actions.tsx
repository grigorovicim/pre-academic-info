import { FETCH_STUDENTS  } from './types';
import { FETCH_STUDENT_PROFILE } from './types';
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
    console.log("fetch complete");
    
};

export const fetchProfileForStudent = (studentId: any) => dispatch => {
    // console.log("fetching profile for student...");
    
    axios.get('/student/profile/'+ studentId)
    .then(res =>{
        dispatch({
            type: FETCH_STUDENT_PROFILE,
            payload: res.data[0]    //because there is ONLY 1 profile corresponding to the student
        })}) 
        .catch(error => {
            console.log(error)
        });;
    // console.log("fetch complete");
};

