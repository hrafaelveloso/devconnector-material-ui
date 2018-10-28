import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEducation } from '../../actions/credentialsActions';
import { ArrowBack } from '@material-ui/icons';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';

class AddEducation extends Component {
  state = {
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onChangeFromDate = e =>
    this.setState({
      from: e
    });

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    } = this.state;

    const educationData = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    };

    this.props.addEducation(educationData, this.props.history);
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
      school,
      errors,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
      disabled
    } = this.state;
    return (
      <div className="add-education">
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
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="text-lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextField
                  label="School"
                  required
                  fullWidth
                  className="mb-3"
                  placeholder="University of Minho"
                  name="school"
                  helperText={errors.school ? errors.school : null}
                  error={errors.school}
                  value={school}
                  onChange={this.onChange}
                />
                <TextField
                  label="Degree or Certification"
                  required
                  fullWidth
                  className="mb-3"
                  placeholder="Some degree"
                  name="degree"
                  helperText={errors.degree ? errors.degree : null}
                  error={errors.degree}
                  value={degree}
                  onChange={this.onChange}
                />
                <TextField
                  label="Field Of Study"
                  required
                  fullWidth
                  className="mb-3"
                  placeholder="Informatics Technologies"
                  name="fieldOfStudy"
                  helperText={errors.fieldOfStudy ? errors.fieldOfStudy : null}
                  error={errors.fieldOfStudy}
                  value={fieldOfStudy}
                  onChange={this.onChange}
                />
                <TextField
                  label="From date"
                  type="date"
                  name="from"
                  value={from}
                  className="mb-3"
                  fullWidth
                  required
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
                  label="Program Description"
                  name="description"
                  placeholder="The program was ..."
                  multiline
                  rows="3"
                  className="mb-3"
                  fullWidth
                  helperText={
                    errors.description
                      ? errors.description
                      : 'Tell us about the program you were in'
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

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    addEducation
  }
)(withRouter(AddEducation));
