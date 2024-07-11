import mongoose from "mongoose";
import slugify from "slugify";
import User from "./user.model.js";

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post user is required']
  },

  author: {
    type: String,
    required: [true, 'Post author is required']
  },
  
  title: {
    type: String,
    required: [true, 'Post title is required'],
  },

  content: {
    type: String,
    required: [true, 'Post content is required']
  },

  images: [
    {
      url: {
        type: String,
        default: ''
      },
      height: {
        type: Number,
        default: 0
      },
      width: {
        type: Number,
        default: 0
      }
    }
  ],

  main_image: {
    type: String,
    default: ''
  },

  read_time: {
    type: Number,
    default: 0,
  },

  category: {
    type: String,
    default: 'General'
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

  publishedAt: {
    type: Date,
    default: Date.now
  },

  slug: {
    type: String,
    // required: [true, 'Post slug is required'],
    unique: true,
  }
}, {timestamps: true})

postSchema.pre('save', async function(next)  {
  if (this.title) {
    // get last 4 characters from _id.
    // const id = this._id.toString().substr(this._id.length - 4);
    // const user_slug = await User.findById(this.user_id).select('slug');
    this.title = this.title.trim().replace(/\s+/g, '-');
    this.slug = slugify( this.title, { lower: true, strict: true });
  }

  next()
})

const Post = mongoose.model("Post", postSchema)

export default Post