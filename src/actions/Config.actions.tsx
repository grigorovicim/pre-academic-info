import { REMOVE_PROFFESOR_COURSE_CONFIG  } from './types';
import { REMOVE_STUDENT_COURSE_CONFIG  } from './types';
import axios from 'axios';

export const removeProfessorConfig = (professorId: any, courseId: any) => dispatch => {
    axios.delete('/config/professor/'+ professorId + '/' + courseId)
    .then(res =>{
        dispatch({
            type: REMOVE_PROFFESOR_COURSE_CONFIG,
            payload: res.data
        })}) 
        .catch(error => {
            console.log(error)
        }
    );
};

export const removeStudentConfig = (studentId: any, courseId: any) => dispatch => {
    axios.delete('/config/student/'+ studentId + '/' + courseId)
    .then(res =>{
        dispatch({
            type: REMOVE_STUDENT_COURSE_CONFIG,
            payload: res.data
        })}) 
        .catch(error => {
            console.log(error)
        }
    );
};