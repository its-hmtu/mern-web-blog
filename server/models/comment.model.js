import mongoose from "mongoose";
import { NotFound, InternalServerError } from "../errors/index.js"; 
import User from './user.model.js'

const commentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    user_name: {
      type: String, 
      required: true,
    },

    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },

    post_title: {
      type: String,
      required: true,
    },

    reply_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },

    content: {
      type: String,
      required: true,
    },
    
    likes_count: {
      type: Number,
      default: 0,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    replies_count: {
      type: Number,
      default: 0,
    },
    
    is_deleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
)

const Comment = mongoose.model("Comment", commentSchema);

commentSchema.pre('save', async function(next) {
  try {
    const user = await User.findById(this.user_id);
    if (!user) {
      next(new NotFound("User not found"))
    }

    if (this.reply_to) {
      const comment = await Comment.findById(this.reply_to);
      if (!comment) {
        next(new NotFound("Comment not found"))
      }
      comment.replies.push(this._id);
      comment.replies_count = comment.replies.length;
      comment.user_name = user.user_name;
      await comment.save();
    } else {
      this.user_name = user.user_name;
      next();
    }
  } catch (error) {
    next(new InternalServerError(error.message))
  }
})

export default Comment;