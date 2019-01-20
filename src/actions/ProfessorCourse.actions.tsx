import axios from 'axios';

export const fetchProfessorCourses = () => dispatch => {
    axios.get('/professorcourse')
    .then(res =>{
        dispatch({
            type: 'FETCH_PROFESSOR_COURSES',
            payload: res.data
        })}) 
        .catch(error => {
            console.log(error)
        });
};

export const createProfessorCourse = postData => dispatch => {
    axios.post('/professorcourse/', postData).then(function(_) {
        console.log('Added professor to course.');
    }).catch(function(error){
        console.log(error);
    });
};