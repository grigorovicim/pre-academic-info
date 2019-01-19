
import axios from 'axios';
import { FETCH_ACTIVITIES, ADD_ACTIVITY } from './types';

export const fetchActivities = () => dispatch => {
    console.log("fetching activities...");

    axios.get('/catalog')
    .then(res =>{
        dispatch({
            type: FETCH_ACTIVITIES,
            payload: res.data
        })}) 
        .catch(error => {
            console.log(error)
        });
};


export const addActivity = (body: any) => dispatch => {

    axios.put('/addactivity', body)
        .then(res => {
            dispatch({
                type: ADD_ACTIVITY,
                payload: res.data
            })
        })
        .catch(error => {
            console.log(error);
        });
};