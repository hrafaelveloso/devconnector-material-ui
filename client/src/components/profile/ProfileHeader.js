import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <Card>
            <CardContent className="bg-info">
              <Grid container>
                <Grid item md={2} className="m-auto">
                  <img
                    className="rounded-circle"
                    src={profile.user.avatar}
                    alt=""
                  />
                </Grid>
              </Grid>
              <div className="text-center">
                <Typography className="text-white" variant="h2">
                  {profile.user.name}
                </Typography>
                <Typography
                  className="text-white mt-2"
                  variant="h6"
                  style={{ fontWeight: '300' }}
                >
                  {profile.status}{' '}
                  {isEmpty(profile.company) ? null : (
                    <span>at {profile.company}</span>
                  )}
                </Typography>
                {isEmpty(profile.location) ? null : (
                  <Typography className="text-white mt-2" variant="body1">
                    {profile.location}
                  </Typography>
                )}
                <p className="mt-3">
                  {isEmpty(profile.website) ? null : (
                    <a
                      href={profile.website}
                      className="text-white p-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-globe fa-2x" />
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.twitter) ? null : (
                    <a
                      href={profile.social.twitter}
                      className="text-white p-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter fa-2x" />
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.facebook) ? null : (
                    <a
                      href={profile.social.facebook}
                      className="text-white p-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook fa-2x" />
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.linkedin) ? null : (
                    <a
                      href={profile.social.linkedin}
                      className="text-white p-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin fa-2x" />
                    </a>
                  )}
                  {isEmpty(
                    profile.social && profile.social.instagram
                  ) ? null : (
                    <a
                      href={profile.social.instagram}
                      className="text-white p-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram fa-2x" />
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.youtube) ? null : (
                    <a
                      href={profile.social.youtube}
                      className="text-white p-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-youtube fa-2x" />
                    </a>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
