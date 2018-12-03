import { FETCH_STUDENTS  } from './types';
// import axios from 'axios';

export const fetchStudents = () => dispatch => {
    console.log("fetching students...");
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then( students =>
        dispatch({
            type: FETCH_STUDENTS,
            payload: students
        }));    
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