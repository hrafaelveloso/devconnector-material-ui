import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import { TextField, Button } from '@material-ui/core';
import TextFieldAdornment from '../common/TextFieldAdornment';
import { ArrowBack } from '@material-ui/icons';
import SelectSingleValue from '../common/SelectSingleValue';
import SelectMultiValue from '../common/SelectMultiValue';
import CreatableSelect from 'react-select/lib/Creatable';
import SelectCreatable from '../common/SelectCreatable';

class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    status2: [
      { label: 'Instructor', value: 'Instructor' },
      { label: 'Teacher', value: 'Teacher' }
    ],
    skills: '',
    githubUsername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    newTreatment: '',
    errors: {}
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      return this.setState({
        errors: this.props.errors
      });
    }

    if (this.props.profile.profile !== prevProps.profile.profile) {
      const { profile } = this.props.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(',');

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubUsername = !isEmpty(profile.githubUsername)
        ? profile.githubUsername
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubUsername: profile.githubUsername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

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

  onChangeStatus = e => {
    this.setState({ status: e });
  };

  onChangeStatusMulti = e => {
    this.setState({ status2: e });
  };

  handleChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'create-option') {
      this.setState({
        newTreatment: newValue[newValue.length - 1]
      });
    }
    this.setState({ status: newValue });
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
      status2,
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
          <TextFieldAdornment
            label="Twitter"
            fullWidth
            name="twitter"
            placeholder="Twitter profile URL"
            error={errors.twitter}
            value={twitter}
            onChange={this.onChange}
            icon="fab fa-twitter"
          />
          <TextFieldAdornment
            label="Facebook"
            fullWidth
            name="facebook"
            placeholder="Facebook profile URL"
            error={errors.facebook}
            value={facebook}
            onChange={this.onChange}
            icon="fab fa-facebook-f"
            className="mt-3"
          />
          <TextFieldAdornment
            label="Linkedin"
            fullWidth
            name="linkedin"
            placeholder="Linkedin profile URL"
            error={errors.linkedin}
            value={linkedin}
            onChange={this.onChange}
            icon="fab fa-linkedin-in"
            className="mt-3"
          />
          <TextFieldAdornment
            label="Youtube"
            fullWidth
            name="youtube"
            placeholder="Youtube profile URL"
            error={errors.youtube}
            value={youtube}
            onChange={this.onChange}
            icon="fab fa-youtube"
            className="mt-3"
          />
          <TextFieldAdornment
            label="Instagram"
            fullWidth
            name="instagram"
            placeholder="Instagram profile URL"
            error={errors.instagram}
            value={instagram}
            onChange={this.onChange}
            icon="fab fa-instagram"
            className="mt-3"
          />
        </div>
      );
    }

    //Select options for status
    const options = [
      { label: 'Select Professional Status', value: '', isDisabled: true },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Full-Stack Developer', value: 'Full-Stack Developer' },
      { label: 'Backend Developerrrrr', value: 'Backend Developer' },
      { label: 'Frontend Developer', value: 'Frontend Developer' },
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
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <Button>
                  <ArrowBack />
                  {'  '}
                  Go Back
                </Button>
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextField
                  label="Profile handle"
                  required
                  fullWidth
                  className="mb-3"
                  name="handle"
                  helperText={
                    errors.handle
                      ? errors.handle
                      : 'A unique handle for your profile URL.'
                  }
                  error={errors.handle}
                  value={handle}
                  onChange={this.onChange}
                />
                <SelectSingleValue
                  fullWidth
                  isClearable
                  error={errors.status}
                  onChange={this.onChangeStatus}
                  placeholder="Professional Status"
                  options={options}
                  helperText="Este é único."
                  value={
                    status !== null && status.label
                      ? { label: status.label, value: status.value }
                      : null
                  }
                  noOptionsMessage="Nenhuma opção satisfaz a procura"
                />
                <SelectMultiValue
                  fullWidth
                  isClearable
                  error={errors.status}
                  onChange={this.onChangeStatusMulti}
                  placeholder="Professional Status"
                  options={options}
                  helperText="Este é múltiplo."
                  value={status2 !== null ? [...status2] : null}
                  noOptionsMessage="Nenhuma opção satisfaz a procura"
                />
                <SelectCreatable
                  fullWidth
                  isClearable
                  helperText="Este dá para criar"
                  onChange={this.handleChange}
                  placeholder="Professional Status"
                  options={options}
                  createLabel="Adicionar tratamento: "
                  value={
                    status !== null && status.label
                      ? { label: status.label, value: status.value }
                      : null
                  }
                />
                <TextField
                  label="Company"
                  fullWidth
                  placeholder="Alphabet"
                  className="mb-3"
                  name="company"
                  helperText={
                    errors.company
                      ? errors.company
                      : 'Could be your own company or one you work for.'
                  }
                  error={errors.company}
                  value={company}
                  onChange={this.onChange}
                />
                <TextField
                  label="Website"
                  fullWidth
                  placeholder="https://google.pt"
                  className="mb-3"
                  name="website"
                  helperText={
                    errors.website
                      ? errors.website
                      : 'Could be your onw website or a company one.'
                  }
                  error={errors.website}
                  value={website}
                  onChange={this.onChange}
                />
                <TextField
                  label="Location"
                  fullWidth
                  placeholder="Braga"
                  className="mb-3"
                  name="location"
                  helperText={
                    errors.location ? errors.location : 'City of your location.'
                  }
                  error={errors.location}
                  value={location}
                  onChange={this.onChange}
                />
                <TextField
                  label="Skills"
                  fullWidth
                  placeholder="HTML,JavaScript,CSS,PHP"
                  className="mb-3"
                  name="skills"
                  helperText={
                    errors.skills
                      ? errors.skills
                      : 'Please use comma separated values.'
                  }
                  error={errors.skills}
                  value={skills}
                  onChange={this.onChange}
                />
                <TextField
                  label="Github Username"
                  fullWidth
                  placeholder="johndoe"
                  className="mb-3"
                  name="githubUsername"
                  helperText={
                    errors.githubUsername
                      ? errors.githubUsername
                      : 'If you want your latest repos and a Github link, include your username.'
                  }
                  error={errors.githubUsername}
                  value={githubUsername}
                  onChange={this.onChange}
                />
                <TextField
                  label="Bio"
                  fullWidth
                  multiline
                  placeholder="Short bio of yoursel"
                  className="mb-3"
                  name="bio"
                  helperText={
                    errors.bio ? errors.bio : 'Tell us a little about yourself.'
                  }
                  error={errors.bio}
                  value={bio}
                  onChange={this.onChange}
                />
                <div className="mb-3">
                  <Button
                    variant="outlined"
                    onClick={() =>
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }
                  >
                    Add Social Network Links
                  </Button>
                  {'  '}
                  <span className="text-muted">Optional</span>
                </div>
                <div className="mb-3">{socialInputs}</div>
                <Button
                  color="primary"
                  fullWidth
                  variant="contained"
                  type="submit"
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

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    createProfile,
    getCurrentProfile
  }
)(withRouter(EditProfile));
