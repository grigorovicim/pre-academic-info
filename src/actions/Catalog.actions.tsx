
import axios from 'axios';
import { FETCH_ACTIVITIES, ADD_ACTIVITY } from './types';

export default class CatalogActions {

    static fetchActivities = (data: any) => (dispatch: any) => {
        console.log("fetching activities...");
        if(data.studentstring === ""){
            data.studentstring = " ";
        }
        data.courseid = 6
        axios.get('/catalog/' + data.courseid + '/' + data.studentstring + '/' + data.week + '/' + data.groupid
        )
            .then(res => {
                dispatch({
                    type: FETCH_ACTIVITIES,
                    payload: {
                       items: res.data
                    }
                })
            })
            .catch(error => {
                console.log(error)
            });
    };

    static saveGroup = (group: string) => (dispatch: any) => {
        dispatch({
            type: 'SAVE_GROUP',
            payload: {
                group : parseInt(group, 10) - 916,
            },
        });
    };

    static saveClassType = (classType: string) => (dispatch: any) => {
        dispatch({
            type: 'SAVE_CLASS',
            payload: {
                classType,
            },
        });
    };

    static saveWeek = (week: string) => (dispatch: any) => {
        dispatch({
            type: 'SAVE_WEEK',
            payload: {
                week,
            },
        });
    };

    static saveStudentSubString = (str: string) => (dispatch: any) => {
        dispatch({
            type: 'SAVE_STUDENT_SUBSTRING',
            payload: {
                str,
            },
        });
    };


    static addActivity = (body: any) => dispatch => {

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
}
