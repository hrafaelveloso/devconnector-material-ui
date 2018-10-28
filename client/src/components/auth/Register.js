import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { errors } = nextProps;

    if (errors) {
      return {
        errors
      };
    }

    return null;
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;

    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { name, email, password, password2, errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextField
                  label="Name"
                  fullWidth
                  required
                  className="mb-3"
                  name="name"
                  helperText={errors.name ? errors.name : null}
                  error={errors.name}
                  value={name}
                  onChange={this.onChange}
                />
                <TextField
                  label="Email Address"
                  fullWidth
                  required
                  type="email"
                  className="mb-3"
                  name="email"
                  helperText={
                    errors.email
                      ? errors.email
                      : 'This site uses Gravatar so if you want a profile image, use a Gravatar email'
                  }
                  error={errors.email}
                  value={email}
                  onChange={this.onChange}
                />
                <TextField
                  label="Password"
                  fullWidth
                  required
                  type="password"
                  className="mb-3"
                  name="password"
                  helperText={errors.password ? errors.password : null}
                  error={errors.password}
                  value={password}
                  onChange={this.onChange}
                />
                <TextField
                  label="Confirm Password"
                  fullWidth
                  required
                  type="password"
                  className="mb-3"
                  name="password2"
                  helperText={errors.password2 ? errors.password2 : null}
                  error={errors.password2}
                  value={password2}
                  onChange={this.onChange}
                />
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(withRouter(Register));
