import axios from 'axios';

import { GET_ERRORS } from './types';

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
  // axios
  //   .post('/api/profile/education', educationData)
  //   .then(res => {
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: {}
  //     });
  //     history.push('/dashboard');
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data
  //     });
  //   });
};
