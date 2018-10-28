import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const ProfileActions = () => {
  return (
    <div className="mb-3">
      <Link to="/edit-profile" style={{ textDecoration: 'none' }}>
        <Button variant="text" size="small" className="text-muted">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Button>
      </Link>
      <Link to="/add-experience" style={{ textDecoration: 'none' }}>
        <Button variant="text" size="small" className="text-muted">
          <i className="fab fa-black-tie text-info mr-1" />
          Add Experience
        </Button>
      </Link>
      <Link to="/add-education" style={{ textDecoration: 'none' }}>
        <Button variant="text" size="small" className="text-muted">
          <i className="fas fa-graduation-cap text-info mr-1" />
          Add Education
        </Button>
      </Link>
    </div>
  );
};
export default ProfileActions;
