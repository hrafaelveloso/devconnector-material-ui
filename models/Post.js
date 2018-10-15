const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  text: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  date: { type: Date, default: Date.now }
});

const PostSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  text: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  likes: [{ user: { type: ObjectId, ref: 'User' } }],
  comments: [CommentSchema],
  date: { type: Date, default: Date.now }
});

module.exports = Post = mongoose.model('Post', PostSchema, 'posts');
