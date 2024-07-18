import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import {
  NotFound,
  BadRequest,
  Unauthorized,
  Forbidden,
  InternalServerError,
} from "../errors/index.js";

import { sendEmailNotification } from "../utils/mailer.js";

const createComment = asyncHandler(async (req, res, next) => {
  try {
    const { content } = req.body;
    const { post_id, reply_to } = req.query;
    const user = req.user;
    const post = await Post.findById(post_id);
    const postOwner = await User.findById(post.user_id);

    const postOwnerBlockedUser = postOwner.blocked_users.includes(user._id);

    if (postOwnerBlockedUser) {
      return next(
        new Forbidden("You are blocked from commenting on this post")
      );
    }

    const comment = await Comment.create({
      user_id: user._id,
      user_name: user.user_name,
      profile_image_url: user.profile_image_url,
      post_id: post_id,
      post_title: post.title,
      content,
      reply_to,
    });

    if (reply_to) {
      const parentComment = await Comment.findById(reply_to);
      parentComment.replies.push(comment._id);
      parentComment.replies_count += 1;
      await parentComment.save();

      const parentCommentUser = await User.findById(parentComment.user_id);
      const options = {
        userId: parentCommentUser._id,
        fullName: parentCommentUser.full_name,
        userEmail: parentCommentUser.email,
        subject: "New Reply on Your Comment",
        text: `${user.user_name} replied to your comment: ${parentComment.content}`,
        url: ``,
      };

      await sendEmailNotification(options);
    }

    post.comments_count += 1;
    post.comments.push(comment._id);
    await post.save();

    user.comments_count += 1;
    user.comments.push(comment._id);
    await user.save();

    // if other users are commenting on the post notify the post owner
    if (post.user_id.toString() !== user._id.toString()) {
      const options = {
        userId: postOwner._id,
        fullName: postOwner.full_name,
        userEmail: postOwner.email,
        subject: "New Comment on Your Post",
        text: `${user.user_name} commented on your post: ${post.title}`,
        url: ``,
      };

      await sendEmailNotification(options);
    }

    res.status(201).json({
      status: "success",
      comment: comment,
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

const getPostComments = asyncHandler(async (req, res) => {
  try {
    const { post } = req.query;
    const comments = await Comment.find({ post_id: post });

    if (!comments) {
      res.status(404);
      throw new Error("No comments found");
    } else {
      res.status(200).json({
        status: "success",
        comments: comments,
      });
    }
  } catch (e) {
    res.status(500);
    throw new Error(`Server Error: ${e.message}`);
  }
});

const deleteComment = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const comment = await Comment.findById(id);
    const post = await Post.findById(comment.post_id);

    if (!comment) {
      return next(new NotFound("Comment not found"));
    }

    const isPostAuthor = post.user_id.toString() === user._id.toString();
    const isCommentAuthor = comment.user_id.toString() === user._id.toString();
    const isCommentByAdmin =
      (await User.findById(comment.user_id)).role === "admin";

    if (
      isCommentAuthor ||
      (isPostAuthor && !isCommentByAdmin) ||
      user.role === "admin"
    ) {
      comment.is_deleted = true;
      comment.content = "This comment has been deleted by the user";
      comment.likes_count = null;

      // remove comment from post comments
      // post.comments = post.comments.filter((comment) => {
      //   return comment.toString() !== id;
      // });

      post.comments_count -= 1;

      // remove comment from user comments
      user.comments = user.comments.filter((comment) => {
        return comment.toString() !== id;
      });

      user.comments_count -= 1;

      await post.save();
      await user.save();
      await comment.save();

      res.status(200).json({
        status: "success",
        message: "Comment deleted",
      });
    } else {
      return next(new Forbidden("Not authorized to delete this comment"));
    }
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

const updateComment = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user = req.user;

    const comment = await Comment.findById(id);

    if (!comment) {
      return next(new NotFound("Comment not found"));
    }

    if (comment.user_id.toString() !== user._id.toString()) {
      return next(new Unauthorized("Not authorized to update this comment"));
    }

    comment.content = content;

    await comment.save();

    res.status(200).json({
      status: "success",
      message: "Comment updated",
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

// get all comments with pagination and filter only for admin
const getAllComments = asyncHandler(async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const comments = await Comment.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      status: "success",
      comments: comments,
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

const getUserComments = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;
    const { page, limit, order } = req.query;

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const sortDirection = order === "asc" ? 1 : -1;
    const comments = await Comment.find({ user_id: user._id })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(parseInt(limit));


    res.status(200).json({
      status: "success",
      message: "User comments retrieved",
      comments: comments,
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

export {
  createComment,
  getPostComments,
  deleteComment,
  updateComment,
  getAllComments,
  getUserComments,
};
