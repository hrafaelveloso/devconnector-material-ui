import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

import { addExperience } from '../../actions/credentialsActions';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

class AddExperience extends Component {
  state = {
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    } = this.state;

    const experienceData = {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    };

    this.props.addExperience(experienceData, this.props.history);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { errors } = nextProps;

    if (errors) {
      return {
        ...prevState,
        errors
      };
    }

    return null;
  }

  render() {
    const {
      company,
      errors,
      title,
      location,
      from,
      to,
      current,
      description,
      disabled
    } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-9 m-auto">
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <Button>
                  <ArrowBack />
                  {'  '}
                  Go Back
                </Button>
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="text-lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextField
                  label="Company"
                  required
                  fullWidth
                  className="mb-3"
                  placeholder="University of Minho"
                  name="company"
                  helperText={errors.company ? errors.company : null}
                  error={errors.company}
                  value={company}
                  onChange={this.onChange}
                />
                <TextField
                  label="Job Title"
                  required
                  fullWidth
                  className="mb-3"
                  placeholder="Student"
                  name="title"
                  helperText={errors.title ? errors.title : null}
                  error={errors.title}
                  value={title}
                  onChange={this.onChange}
                />
                <TextField
                  label="Location"
                  fullWidth
                  className="mb-3"
                  placeholder="Campus de Azurém"
                  name="location"
                  helperText={errors.location ? errors.location : null}
                  error={errors.location}
                  value={location}
                  onChange={this.onChange}
                />
                <TextField
                  label="From date"
                  type="date"
                  name="from"
                  required
                  value={from}
                  className="mb-3"
                  fullWidth
                  onChange={this.onChange}
                  error={errors.from}
                  helperText={errors.from ? errors.from : null}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  label="To date"
                  type="date"
                  name="to"
                  className="mb-3"
                  value={to}
                  fullWidth
                  onChange={this.onChange}
                  error={errors.to}
                  InputLabelProps={{
                    shrink: true
                  }}
                  disabled={disabled ? true : false}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={current}
                      onChange={this.onCheck}
                      color="primary"
                    />
                  }
                  label="Current"
                />
                <TextField
                  label="Job Description"
                  name="description"
                  placeholder="The work consisted ..."
                  multiline
                  rows="3"
                  className="mb-3"
                  fullWidth
                  helperText={
                    errors.description
                      ? errors.description
                      : 'Tell us about the job you were in'
                  }
                  value={description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <Button
                  type="submit"
                  className="mt-3"
                  color="primary"
                  variant="contained"
                  fullWidth
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

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    addExperience
  }
)(withRouter(AddExperience));
