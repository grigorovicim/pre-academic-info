import { FETCH_STUDENTS  } from './types';
import axios from 'axios';

export const fetchStudents = (courseId: any) => dispatch => {
    console.log("fetching students...");

    axios.get('/student/course/1')
    .then(res =>{
        console.log("doing something");
        
        dispatch({
            type: FETCH_STUDENTS,
            payload: res.data
        })}) 
        .catch(error => {
            console.log(error)
        });;

    // return axios.get("http://localhost:5000/student/course/1")
    //   .then((response) => dispatch({
    //     type: FETCH_STUDENTS,
    //     data: response.data
    //   })).catch((response) => dispatch({
    //     type: FETCH_STUDENTS,
    //     error: response.error,
    //   }))

    // fetch('https://jsonplaceholder.typicode.com/users')
    // .then(res => res.json())
    // .then( students =>
    //     dispatch({
    //         type: FETCH_STUDENTS,
    //         payload: students
    //     }));    

    console.log("fetch complete");
    
};

// export function fetchStudents() {
//     return function action(dispatch) {
//       dispatch({ type: FETCH_STUDENTS })

//       const request = axios({
//         method: 'GET',
//         url: `https://jsonplaceholder.typicode.com/users`,
//         headers: []
//       });
      
//       return request.then(
//         response => dispatch(fetchStudentsSuccess(response)),
//         err => dispatch(fetchStudentsError(err))
//       );
//     }
//   }


// export default class StudentActions {
// }