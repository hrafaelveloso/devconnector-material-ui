import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';
import { Grid, Typography } from '@material-ui/core';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;

    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <Grid container spacing={16} className="m-auto">
        <Grid item xs={12}>
          <Typography variant="h4" className="text-center">
            Developer Profiles
          </Typography>
          <Typography className="text-center mb-3">
            Browse and connect with developers
          </Typography>
          {profileItems}
        </Grid>
      </Grid>
      // <div className="profiles">
      //   <div className="container">
      //     <div className="row">
      //       <div className="col-md-12">
      //         <h1 className="display-4 text-center">Developer Profiles</h1>
      //         <p className="lead text-center">
      //           Browse and connect with developers
      //         </p>
      //         {profileItems}
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    getProfiles
  }
)(Profiles);
