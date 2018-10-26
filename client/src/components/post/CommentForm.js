import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/postActions';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button
} from '@material-ui/core';

class CommentForm extends Component {
  state = {
    text: '',
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { text } = this.state;
    const { postId } = this.props;
    const { name, avatar } = user;

    const newComment = {
      text,
      name,
      avatar
    };

    this.props.addComment(postId, newComment);

    this.setState({
      text: ''
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      return this.setState({
        errors: this.props.errors
      });
    }
  }

  render() {
    const { text, errors } = this.state;
    let errorText;

    errors.text ? (errorText = true) : (errorText = false);
    return (
      <Card className="mb-4">
        <CardHeader
          titleTypographyProps={{
            variant: 'subtitle1'
          }}
          title="Say something..."
          classes={{
            title: 'text-white'
          }}
          className="bg-info"
        />
        <form noValidate onSubmit={this.onSubmit}>
          <CardContent>
            <TextField
              label="Reply to post"
              multiline
              rows="3"
              error={errorText}
              required
              fullWidth
              name="text"
              helperText={errors.text}
              onChange={this.onChange}
              value={text}
              margin="normal"
              variant="outlined"
            />
          </CardContent>
          <CardActions>
            <Button
              onClick={this.onSubmit}
              size="small"
              variant="outlined"
              color="primary"
            >
              Submit
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    addComment
  }
)(CommentForm);
