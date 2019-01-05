import { FETCH_COURSES  } from './types';
import axios from 'axios';

export const fetchCourses = () => dispatch => {
    axios.get('/course')
    .then(res =>{
        dispatch({
            type: FETCH_COURSES,
            payload: res.data
        })}) 
        .catch(error => {
            console.log(error)
        });;
};
