import { FETCH_COURSE_CONFIG } from './types';
import axios from 'axios';

export const fetchCourseConfig = (configId: any) => (dispatch:any) => {
    axios.get('/courseConfig/'+configId)
        .then(res =>{
            dispatch({
                type: FETCH_COURSE_CONFIG,
                payload: res.data
            })
            console.log(res.data);
        })
        .catch(error => {
            console.log(error)
        });
};
