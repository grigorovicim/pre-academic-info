import { FETCH_PROFESSORS  } from './types';
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