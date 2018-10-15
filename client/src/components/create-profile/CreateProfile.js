import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubUsername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      displaySocialInputs,
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubUsername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    } = this.state;

    const profileData = {
      displaySocialInputs,
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubUsername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    };

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const {
      displaySocialInputs,
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubUsername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
      errors
    } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    //Select options for status
    const options = [
      { label: 'Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student', value: 'Student' },
      { label: 'Learning', value: 'Learning' },
      { label: 'Instructor', value: 'Instructor' },
      { label: 'Teacher', value: 'Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-9 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile look better
              </p>
              <small className="d-block pb-3">* = required</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="hrafaelveloso"
                  name="handle"
                  value={handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  label="* Profile handle"
                  info="A unique handle for your profile URL."
                />
                <SelectListGroup
                  placeholder="johndoe"
                  name="status"
                  value={status}
                  onChange={this.onChange}
                  error={errors.status}
                  label="Select Professional Status"
                  options={options}
                  info="Give us an idea where you are at in your career."
                />
                <TextFieldGroup
                  placeholder="Alphabet"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                  label="Company"
                  info="Could be your onw company or one you work for."
                />
                <TextFieldGroup
                  placeholder="https://google.pt"
                  name="website"
                  value={website}
                  onChange={this.onChange}
                  error={errors.website}
                  label="Website"
                  info="Could be your onw website or a company one."
                />
                <TextFieldGroup
                  placeholder="Braga"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
                  label="Location"
                  info="City of your location."
                />
                <TextFieldGroup
                  placeholder="HTML,JavaScript,CSS,PHP"
                  name="skills"
                  value={skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  label="Skills"
                  info="Please use comma separated values."
                />
                <TextFieldGroup
                  placeholder="johndoe"
                  name="githubUsername"
                  value={githubUsername}
                  onChange={this.onChange}
                  error={errors.githubUsername}
                  label="Github Username"
                  info="If you want your latest repos and a Github link, include your username."
                />
                <TextAreaFieldGroup
                  placeholder="Short bio of yourself"
                  name="bio"
                  value={bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  label="Bio"
                  info="Tell us a little about yourself."
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() =>
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  {'  '}
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    createProfile
  }
)(withRouter(CreateProfile));
