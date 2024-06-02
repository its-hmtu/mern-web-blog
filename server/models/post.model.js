import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  
  title: {
    type: String,
    required: true,
    // unique: true,
  },

  content: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: 'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png'
  },

  minReadMs: {
    type: Number,
    required: true,
    default: 10 * 60 * 1000 // ten minutes in milliseconds 
  },

  category: {
    type: String,
    default: 'uncategorized'
  }, 

  slug: {
    type: String,
    required: true,
    unique: true,
    // default: function() {
    //   return slugify(this.title, {lower: true, strict: true}) + '-' + Date.now()
    // }
  }
}, {timestamps: true})

postSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, {lower: true, strict: true}) + '-' + Date.now();
  }

  next()
})

const Post = mongoose.model("Post", postSchema)

export default Post