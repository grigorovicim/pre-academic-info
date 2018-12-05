import { FETCH_PROFESSORS, FETCH_PROFESSOR_PROFILE  } from './types';
import axios from 'axios';

/// TODO: change to fetchProfessorsByCourseId
export const fetchProfessors = (courseId: any) => dispatch => {
    axios.get('/professor/course/'+courseId)
    .then(res =>{
        dispatch({
            type: FETCH_PROFESSORS,
            payload: res.data
        })}) 
        .catch(error => {
            console.log(error)
        });;
};

export const fetchProfessorProfile = (professorId: any) => dispatch => {
    axios.get('/professor/profile/'+professorId)
    .then(res =>{
        dispatch({
            type: FETCH_PROFESSOR_PROFILE,
            payload: res.data[0]    //because there is ONLY 1 profile corresponding to the professor
        })}) 
        .catch(error => {
            console.log(error)
        });;
};
