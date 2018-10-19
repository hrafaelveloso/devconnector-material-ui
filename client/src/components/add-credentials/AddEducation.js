import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

import { addEducation } from '../../actions/credentialsActions';

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
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="text-lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="University of Minho"
                  label="* School"
                  name="school"
                  value={school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="Some degree"
                  label="* Degree or Certification"
                  name="degree"
                  value={degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="Informatics Technologies"
                  label="* Field Of Study"
                  name="fieldOfStudy"
                  value={fieldOfStudy}
                  onChange={this.onChange}
                  error={errors.fieldOfStudy}
                />
                <TextFieldGroup
                  label="From date"
                  name="from"
                  type="date"
                  value={from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <TextFieldGroup
                  label="To date"
                  name="to"
                  type="date"
                  value={to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    name="current"
                    className="form-check-input"
                    value={current}
                    checked={current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current
                  </label>
                </div>
                <TextAreaFieldGroup
                  label="Program Description"
                  placeholder="The program was ..."
                  name="description"
                  info="Tell us about the program you were in"
                  value={description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
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
