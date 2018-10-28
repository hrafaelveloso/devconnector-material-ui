import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';
import { Card, Grid, Typography, Button, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

class CommentItem extends Component {
  onDeleteClick = (e, postId, commentId) => {
    e.preventDefault();

    this.props.deleteComment(postId, commentId);
  };

  render() {
    const { postId, comment, auth } = this.props;
    console.dir(comment);
    return (
      <Card className="mb-3">
        <CardContent>
          <Grid container spacing={16}>
            <Grid item md={2}>
              <Link to="/profiles">
                <img
                  className="rounded-circle d-none d-md-block"
                  src={comment.avatar}
                  alt=""
                />
              </Link>
              <br />
              <Typography variant="subtitle1" className="text-center">
                {comment.name}
              </Typography>
            </Grid>
            <Grid item md={10}>
              <Typography variant="h6" style={{ fontWeight: '300' }}>
                {comment.text}
              </Typography>
              {comment.user === auth.user.id ? (
                <Button
                  className="bg-danger"
                  onClick={e => this.onDeleteClick(e, postId, comment._id)}
                >
                  <i className="fas fa-times" />
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    deleteComment
  }
)(CommentItem);
