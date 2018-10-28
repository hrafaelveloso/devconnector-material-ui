import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
import { Typography, Button } from '@material-ui/core';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    e.preventDefault();

    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashBoardContent;

    if (profile === null || loading) {
      dashBoardContent = <Spinner />;
    } else {
      //Check if log in user has profile data
      if (Object.keys(profile).length > 0) {
        dashBoardContent = (
          <div>
            <Typography variant="h5" style={{ fontWeight: '300' }}>
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </Typography>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className="mb-2 mt-3">
              <Button
                onClick={this.onDeleteClick}
                variant="contained"
                className="bg-danger"
              >
                Delete my account
              </Button>
            </div>
          </div>
        );
      } else {
        dashBoardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Typography variant="h2">Dashboard</Typography>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    deleteAccount
  }
)(Dashboard);
