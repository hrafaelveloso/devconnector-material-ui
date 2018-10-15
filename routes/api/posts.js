const express = require('express');
const router = express.Router();
const passport = require('passport');

//Models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

//Validation
const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');

// @route   GET /api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res, next) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(404).json({ noPostsFound: 'No Posts Found' });
    });
});

// @route   GET /api/posts/:post_id
// @desc    Get post by id
// @access  Public
router.get('/:post_id', (req, res, next) => {
  Post.findById(req.params.post_id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(404).json({ noPostFound: 'No Post Found with that ID' });
    });
});

// @route   POST /api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => {
      res.json(post);
    });
  }
);

// @route   POST /api/posts/like/:post_id
// @desc    Like post
// @access  Private
router.post(
  '/like/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            //Verifica se o user já deu like no post
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyLiked: 'User already liked this post' });
            }

            post.likes.push({ user: req.user.id });

            post.save().then(post => {
              res.json(post);
            });
          })
          .catch(err => {
            res.status(404).json({ noPostFound: 'No Post Found with that ID' });
          });
      })
      .catch(err => {
        res.status(404).json({ noPostFound: 'No Profile Found with that ID' });
      });
  }
);

// @route   POST /api/posts/unlike/:post_id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            //Verifica se o user já deu like no post
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0
            ) {
              return res
                .status(400)
                .json({ notLiked: 'User have not yet liked this post' });
            }

            //Get remove index
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            //Remove from array
            post.likes.splice(removeIndex, 1);

            post.save().then(post => {
              res.json(post);
            });
          })
          .catch(err => {
            res.status(404).json({ noPostFound: 'No Post Found with that ID' });
          });
      })
      .catch(err => {
        res.status(404).json({ noPostFound: 'No Profile Found with that ID' });
      });
  }
);

// @route   POST /api/posts/comment/:post_id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //Add to comments array
        post.comments.unshift(newComment);

        post.save().then(post => {
          res.json(post);
        });
      })
      .catch(err => {
        res.status(404).json({ postNotFound: 'No Post with that ID' });
      });
  }
);

// @route   DELETE /api/posts/comment/:post_id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:post_id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Post.findById(req.params.post_id)
      .then(post => {
        //Vereficar se comentário existe
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentNotFound: 'Comment does not exist' });
        }

        //Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        post.save().then(post => {
          res.json(post);
        });
      })
      .catch(err => {
        res.status(404).json({ postNotFound: 'No Post with that ID' });
      });
  }
);

// @route   DELETE /api/posts/:post_id
// @desc    Delete post by id
// @access  Private
router.delete(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notAuthorized: 'User not authorized' });
            }

            post
              .remove()
              .then(() => {
                res.json({ success: true });
              })
              .catch(err => {
                res
                  .status(404)
                  .json({ noPostFound: 'No Post Found with that ID' });
              });
          })
          .catch(err => {
            res.status(404).json({ noPostFound: 'No Post Found with that ID' });
          });
      })
      .catch(err => {
        res.status(404).json({ noPostFound: 'No Profile Found with that ID' });
      });
  }
);

module.exports = router;
