import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import { Check } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    const firstName = profile.user.name.trim().split(' ')[0];

    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <Check /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <Typography variant="h4" align="center" className="text-info">
              {firstName}
              's Bio
            </Typography>
            {isEmpty(profile.bio) ? (
              <span>
                {firstName}
                's does not have a bio
              </span>
            ) : (
              <Typography variant="body1">{profile.bio}</Typography>
            )}
            <hr />
            <Typography variant="h4" className="text-center text-info">
              Skill Set
            </Typography>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
