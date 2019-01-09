import { FETCH_PROFILES  } from './types';
import axios from 'axios';

export const fetchProfiles = () => dispatch => {
    axios.get('/profile')
    .then(res =>{
        dispatch({
            type: FETCH_PROFILES,
            payload: res.data
        })}) 
        .catch(error => {
            console.log(error)
        });
};
