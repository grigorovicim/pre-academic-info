import { FETCH_PROFILES, NEW_PROFILE, FETCH_PROFILE  } from './types';
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

export const fetchProfile = (profileId: any) => dispatch => {
  axios.get('/profile/' + profileId).then(res => {
    dispatch({
      type: FETCH_PROFILE,
      payload: res.data
    })}).catch(error => {
    console.log(error);
  });
}

export const updateUser = (userDetails: any) => dispatch => {
  axios.get('/profile/' + userDetails.profile.id).then(res => {
    userDetails.profile = res.data;
    dispatch({
      type: FETCH_PROFILE,
      payload: userDetails
    })}).catch(error => {
    console.log(error);
  });
}

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