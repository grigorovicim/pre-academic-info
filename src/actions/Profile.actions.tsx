import { FETCH_PROFILES, NEW_PROFILE  } from './types';
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

export const createProfile = postData => dispatch => {
    fetch('/profile', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(profile =>
        dispatch({
          type: NEW_PROFILE,
          payload: profile
        })
      );
  };