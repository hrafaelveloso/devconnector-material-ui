import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { TextField, Button } from '@material-ui/core';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { errors, auth } = nextProps;

    if (auth.isAuthenticated) {
      nextProps.history.push('/dashboard');
    }

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

    const { email, password } = this.state;

    const userData = {
      email,
      password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextField
                  label="Email address"
                  fullWidth
                  required
                  type='email'
                  className="mb-3"
                  name="email"
                  helperText={errors.email ? errors.email : null}
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
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
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
    loginUser
  }
)(Login);
