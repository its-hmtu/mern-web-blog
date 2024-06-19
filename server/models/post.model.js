import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  images: [
    {
      type: String,
      default: ''
    }
  ],

  main_image: {
    type: String,
    default: ''
  },

  reading_time: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    default: 'uncategorized'
  },
  
  comments_count: {
    type: Number,
    default: 0
  },

  likes_count: {
    type: Number,
    default: 0
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],

  publish_timestamp: {
    type: Date,
    default: Date.now
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  }
}, {timestamps: true})

postSchema.pre('validate', function(next) {
  if (this.title) {
    // get last 4 characters from _id.
    const id = this._id.toString().substr(this._id.length - 4);
    this.slug = slugify(this.title, {lower: true, strict: true}) + '-' + id;
  }

  next()
})

const Post = mongoose.model("Post", postSchema)

export default Post