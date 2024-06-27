import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
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
  },
  {
    timestamps: true,
  }
)

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;