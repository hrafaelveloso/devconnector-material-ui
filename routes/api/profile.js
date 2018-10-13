const express = require('express');
const router = express.Router();
const passport = require('passport');

//Models
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//Profile validation
const validateProfileInput = require('../../validation/profile');

// @route   GET /api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res, next) => {
  res.json({
    msg: 'Profile Works'
  });
});

// @route   GET /api/profile
// @desc    Get current user profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noProfile = 'There is no Profile for this user';
          res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => {
        res
          .status(404)
          .json({ noProfile: 'There is no Profile for this user' });
      });
  }
);

// @route   GET /api/profile/all
// @desc    Receive all profiles
// @access  Public
router.get('/all', (req, res, next) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      return res.json(profiles);
    })
    .catch(err => {
      return res.status(404).json({ noProfile: 'There are no Profiles' });
    });
});

// @route   GET /api/profile/handle/:handle
// @desc    Receive profile by handle
// @access  Public
router.get('/handle/:handle', (req, res, next) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no Profile with this handle';
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch(err => {
      return res
        .status(404)
        .json({ noProfile: 'There is no Profile with this handle' });
    });
});

// @route   GET /api/profile/user/:user_id
// @desc    Receive profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res, next) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no Profile with this User';
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch(err => {
      return res
        .status(404)
        .json({ noProfile: 'There is no Profile with this User' });
    });
});

// @route   POST /api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUsername)
      profileFields.githubUsername = req.body.githubUsername;

    //Skills - Split into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    //Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          res.json(profile);
        });
      } else {
        //Create

        //Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists.';
            return res.status(400).json(errors);
          }

          new Profile(profileFields).save().then(profile => {
            res.json(profile);
          });
        });
      }
    });
  }
);

module.exports = router;
