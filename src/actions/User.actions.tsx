import { FETCH_USERS, NEW_USER  } from './types';
import axios from 'axios';

export const fetchUsers = () => dispatch => {
    axios.get('/user')
    .then(res =>{
        dispatch({
            type: FETCH_USERS,
            payload: res.data
        })}) 
        .catch(error => {
            console.log(error)
        });;
};

export const createUser = postData => dispatch => {
    fetch('/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(user =>
        dispatch({
          type: NEW_USER,
          payload: user
        })
      )
      .catch( error => {
        console.log(error)
      }
        
      );
  };