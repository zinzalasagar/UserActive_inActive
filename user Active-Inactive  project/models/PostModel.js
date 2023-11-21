const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // location: {
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //     required: true,
  //     default: 'Point',
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true,
  //   },
  // },
  createdAt: { type: Date, default: Date.now },
});

PostSchema.index({ location: "2dsphere" });

const Post = mongoose.model("User", PostSchema);

module.exports = Post;
