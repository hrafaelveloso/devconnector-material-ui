import axios from 'axios';

import { GET_ERRORS, GET_PROFILE } from './types';

//Add experience
export const addExperience = (experienceData, history) => dispatch => {
  axios
    .post('/api/profile/experience', experienceData)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
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

//Add education
export const addEducation = (educationData, history) => dispatch => {
  axios
    .post('/api/profile/education', educationData)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
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

//Delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Delete education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
