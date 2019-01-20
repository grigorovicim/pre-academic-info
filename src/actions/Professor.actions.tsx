import { FETCH_PROFESSORS, FETCH_PROFESSOR_PROFILE} from './types';
import axios from 'axios';

/// TODO: change to fetchProfessorsByCourseId
export const fetchProfessors = (courseId: any) => dispatch => {
    axios.get('/professor/course/' + courseId)
        .then(res => {
            dispatch({
                type: FETCH_PROFESSORS,
                payload: res.data
            })
        })
        .catch(error => {
            console.log(error)
        });
};

export const fetchProfessorsEnrolled = (courseId: any, name: any) => (dispatch:any) => {
    axios.get('/professor/enrolled/course/'+courseId)
        .then(res =>{
            if(name == null) {
                dispatch({
                    type: 'FETCH_PROFESSORS_ENROLLED',
                    payload: res.data
                });
            }
            else {
                dispatch({
                    type: 'FETCH_PROFESSORS_ENROLLED',
                    payload: res.data.filter(professor => { 
                        const professorname = professor.Profile.first_name + ' ' + professor.Profile.last_name;
                        return professorname.search(name) !== -1;
                    }),
                });
            }
        })
        .catch(error => {
            console.log(error)
        });
};

export const fetchProfessorsNotEnrolled = (courseId: any, name: any) => (dispatch:any) => {
    axios.get('/professor/not-enrolled/course/'+courseId)
        .then(res =>{
            if(name == null) {
                dispatch({
                    type: 'FETCH_PROFESSORS_NOT_ENROLLED',
                    payload: res.data
                });
            }
            else {
                dispatch({
                    type: 'FETCH_PROFESSORS_NOT_ENROLLED',
                    payload: res.data.filter(professor => { 
                        const professorname = professor.Profile.first_name + ' ' + professor.Profile.last_name;
                        return professorname.search(name) !== -1;
                    }),
                });
            }
        })
        .catch(error => {
            console.log(error)
        });
};

export const fetchProfessorProfile = (professorId: any) => (dispatch:any) => {
    axios.get('/professor/profile/'+professorId)
        .then(res =>{
            dispatch({
                type: FETCH_PROFESSOR_PROFILE,
                payload: res.data[0]    //because there is ONLY 1 profile corresponding to the professor
            })})
        .catch(error => {
            console.log(error)
        });
};

export const addProfessor = (body: any) => dispatch => {
    console.log("called post API");
    axios.post('/config/professor/', body)
        .then(res => {
            dispatch({
                payload: res.data
            })
        })
        .catch(error => {
            console.log(error);
        });
};
