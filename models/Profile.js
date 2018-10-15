const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ExperienceSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  from: { type: Date, required: true },
  to: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String }
});

const EducationSchema = new Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String },
  from: { type: Date, required: true },
  to: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String }
});

const SocialSchema = new Schema({
  youtube: { type: String },
  twitter: { type: String },
  facebook: { type: String },
  linkedin: { type: String },
  instagram: { type: String }
});

const ProfileSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  handle: { type: String, required: true, max: 40 },
  company: { type: String },
  website: { type: String },
  location: { type: String },
  status: { type: String, required: true },
  skills: { type: [String], required: true },
  bio: { type: String },
  githubUsername: { type: String },
  experience: [ExperienceSchema],
  education: [EducationSchema],
  social: SocialSchema,
  date: { type: Date, default: Date.now }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema, 'profiles');
