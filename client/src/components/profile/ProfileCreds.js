import React, { Component } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item mb-2">
        <Typography variant="h6">{exp.company}</Typography>
        <p>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
          {exp.to === null ? (
            ' now'
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </p>
        <p>
          <Typography
            component="span"
            variant="h6"
            style={{ display: 'inline', fontSize: '1rem' }}
          >
            Position:{' '}
          </Typography>
          <Typography
            component="span"
            variant="subtitle1"
            style={{ display: 'inline' }}
          >
            {exp.title}
          </Typography>
        </p>
        {exp.location === '' ? null : (
          <p>
            <Typography
              component="span"
              variant="h6"
              style={{ display: 'inline', fontSize: '1rem' }}
            >
              Location:{' '}
            </Typography>
            <Typography
              component="span"
              variant="subtitle1"
              style={{ display: 'inline' }}
            >
              {exp.location}
            </Typography>
          </p>
        )}
        {exp.description === '' ? null : (
          <>
            <Typography
              component="span"
              variant="h6"
              style={{ display: 'inline', fontSize: '1rem' }}
            >
              Description:{' '}
            </Typography>
            <Typography
              component="span"
              variant="subtitle1"
              style={{ display: 'inline' }}
            >
              {exp.description}
            </Typography>
          </>
        )}
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item mb-2">
        <Typography variant="h6">{edu.school}</Typography>
        <p>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -
          {edu.to === null ? (
            ' now'
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </p>
        <p>
          <Typography
            component="span"
            variant="h6"
            style={{ display: 'inline', fontSize: '1rem' }}
          >
            Degree:{' '}
          </Typography>
          <Typography
            component="span"
            variant="subtitle1"
            style={{ display: 'inline' }}
          >
            {edu.degree}
          </Typography>
        </p>
        <p>
          <Typography
            component="span"
            variant="h6"
            style={{ display: 'inline', fontSize: '1rem' }}
          >
            Field of Study:{' '}
          </Typography>
          <Typography
            component="span"
            variant="subtitle1"
            style={{ display: 'inline' }}
          >
            {edu.fieldOfStudy}
          </Typography>
        </p>
        {edu.description === '' ? null : (
          <p>
            <Typography
              component="span"
              variant="h6"
              style={{ display: 'inline', fontSize: '1rem' }}
            >
              Description:{' '}
            </Typography>
            <Typography
              component="span"
              variant="subtitle1"
              style={{ display: 'inline' }}
            >
              {edu.description}
            </Typography>
          </p>
        )}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <Typography variant="h5" align="center" className="text-info">
            Experience
          </Typography>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
        <div className="col-md-6">
          <Typography variant="h5" align="center" className="text-info">
            Education
          </Typography>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

ProfileCreds.propTypes = {
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired
};

export default ProfileCreds;
