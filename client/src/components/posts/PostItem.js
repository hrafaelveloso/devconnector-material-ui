import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import Swal from 'sweetalert2';
import { Card, Grid, CardContent, Typography, Button } from '@material-ui/core';

class PostItem extends Component {
  onDeleteClick = (e, id) => {
    e.preventDefault();
    Swal({
      title: 'Delete post!',
      text: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      focusCancel: true
    }).then(result => {
      if (result.value) {
        this.props.deletePost(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal('Cancelled', 'Your post was not deleted!', 'error');
      }
    });
  };

  onLikeClick = (e, id) => {
    e.preventDefault();
    this.props.addLike(id);
  };

  onUnlikeClick = (e, id) => {
    e.preventDefault();
    this.props.removeLike(id);
  };

  findUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { post, auth, showActions } = this.props;
    return (
      <Card className="mb-3">
        <CardContent>
          <Grid container spacing={16}>
            <Grid item md={2}>
              <Link to={`/profiles`}>
                <img
                  className="rounded-circle d-none d-md-block"
                  src={post.avatar}
                  alt=""
                />
              </Link>
              <br />
              <Typography variant="subtitle1" className="text-center">
                {post.name}
              </Typography>
            </Grid>
            <Grid item md={10}>
              <Typography variant="h5" style={{ fontWeight: '300' }}>
                {post.text}
              </Typography>
              {showActions ? (
                <div className="mt-3">
                  <Button
                    color={classnames(
                      {
                        primary: this.findUserLike(post.likes)
                      },
                      {
                        default: !this.findUserLike(post.likes)
                      }
                    )}
                    onClick={e => this.onLikeClick(e, post._id)}
                  >
                    <i
                      className={classnames('fas fa-thumbs-up', {
                        'text-info': this.findUserLike(post.likes)
                      })}
                    />
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </Button>
                  <Button
                    color="primary"
                    onClick={e => this.onUnlikeClick(e, post._id)}
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </Button>
                  <Link
                    to={`/post/${post._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant="contained" color="primary">
                      Comments
                    </Button>
                  </Link>
                  {post.user === auth.user.id ? (
                    <Button
                      onClick={e => this.onDeleteClick(e, post._id)}
                      variant="contained"
                      className="bg-danger text-white ml-2"
                    >
                      <i className="fas fa-times" />
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    deletePost,
    addLike,
    removeLike
  }
)(PostItem);
