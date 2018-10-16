import axios from 'axios';
import Swal from 'sweetalert2';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_ERRORS
} from './types';

//Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get('/api/profile')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    //User does not have profile, needs to create one
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

//Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => {
      dispatch({
        type: SET_ERRORS,
        payload: {}
      });
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

//Delete profile
export const deleteAccount = () => dispatch => {
  Swal({
    title: 'Delete account!',
    text: 'Are you sure? This can NOT be undone!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    focusCancel: true
  }).then(result => {
    if (result.value) {
      axios
        .delete('/api/profile')
        .then(res => {
          dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          });
          localStorage.removeItem('jwtToken');
        })
        .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
        });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal('Cancelled', 'Your account was not deleted!', 'error');
    }
  });
};
