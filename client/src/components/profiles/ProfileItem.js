import {
  List,
  ListItem,
  Button,
  Card,
  CardContent,
  Grid,
  Hidden,
  Typography
} from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProfileAbout from '../profile/ProfileAbout';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <Card className="mb-2">
        <CardContent>
          <Grid container spacing={32}>
            <Grid item md={2} sm={2}>
              <img
                src={profile.user.avatar}
                alt={profile.user.name}
                className="rounded-circle w-100"
              />
            </Grid>
            <Grid item md={3} sm={8} lg={4}>
              <Typography color="textPrimary" variant="h5">
                {profile.user.name}
              </Typography>
              <p className="mt-3">
                <Link
                  to={`/profile/${profile.handle}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="contained" color="primary">
                    View profile
                  </Button>
                </Link>
              </p>
            </Grid>
            <Hidden mdDown>
              <Grid item md={3} lg={6}>
                <Typography color="textSecondary" variant="h6">
                  Skill set
                </Typography>
                <List>
                  {profile.skills.slice(0, 4).map((skill, index) => (
                    <ListItem key={index} divider>
                      <Check /> {skill}
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Hidden>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
