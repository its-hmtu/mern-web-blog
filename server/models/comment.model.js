import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
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
    ]
  },
  {
    timestamps: true,
  }
)

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;