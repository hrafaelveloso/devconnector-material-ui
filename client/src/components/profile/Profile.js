import React, { Component } from 'react';
import ProfileAbout from './ProfileAbout';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from '../../actions/profileActions';
import { Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" style={{ textDecoration: 'none' }}>
                <Button variant="contained" size="small" className="mb-2">
                  <ArrowBack />
                  Back to profiles
                </Button>
              </Link>
            </div>
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    getProfileByHandle
  }
)(Profile);
