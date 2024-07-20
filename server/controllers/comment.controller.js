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
    const postAuthor = await User.findById(post.user_id);

    const postAuthorBlockedUser = postAuthor.blocked_users.includes(user._id);

    if (user.role === "user" && postAuthorBlockedUser) {
      return next(new Forbidden("You are blocked from commenting on this post"));
    }

    const comment = new Comment({
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

      // const parentCommentUser = await User.findById(parentComment.user_id);

      req.io.emit('newReply', {
        reply: comment,
        comment: parentComment,
      })
      // const options = {
      //   userId: parentCommentUser._id,
      //   fullName: parentCommentUser.full_name,
      //   userEmail: parentCommentUser.email,
      //   subject: "New Reply on Your Comment",
      //   text: `${user.user_name} replied to your comment: ${parentComment.content}`,
      //   url: ``,
      // };

      // await sendEmailNotification(options);
    }

    post.comments_count += 1;
    post.comments.push(comment._id);
    await post.save();

    user.comments_count += 1;
    user.comments.push(comment._id);
    await user.save();

    // if other users are commenting on the post notify the post owner
    if (postAuthor._id.toString() !== user._id.toString()) {
      // const options = {
      //   userId: postOwner._id,
      //   fullName: postOwner.full_name,
      //   userEmail: postOwner.email,
      //   subject: "New Comment on Your Post",
      //   text: `${user.user_name} commented on your post: ${post.title}`,
      //   url: ``,
      // };

      // await sendEmailNotification(options);

      req.io.emit('newComment', {
        comment: comment,
        post: post,
      });
    }

    await comment.save();

    res.status(201).json({
      status: "success",
      message: "Comment created",
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

    const isAdmin = user.role === "admin";
    const isModerator = user.role === "moderator";
    const isCommentAuthor = comment.user_id.toString() === user._id.toString();
    const isPostAuthor = post.user_id.toString() === user._id.toString();

    if (
      isAdmin ||
      isModerator ||
      isCommentAuthor ||
      isPostAuthor
    ) {
      if (comment.reply_to) {
        const parentComment = await Comment.findById(comment.reply_to);
        parentComment.replies = parentComment.replies.filter((reply) => {
          return reply.toString() !== comment._id.toString();
        });
        parentComment.replies_count -= 1;
        if (parentComment.replies_count <= 0) {
          parentComment.replies_count = 0;
        }
        await parentComment.save();

        comment.reply_to = null;
      }

      post.comments_count -= 1;
      if (post.comments_count <= 0) {
        post.comments_count = 0;
      }
      // remove comment from user comments
      user.comments = user.comments.filter((comment) => {
        return comment.toString() !== id;
      });

      user.comments_count -= 1; 
      if (user.comments_count <= 0) {
        user.comments_count = 0;
      }

      await post.save();
      await user.save();
      await Comment.deleteOne({ _id: id });

      // if it is an admin or moderator deleting the comment, notify the user
      if (isAdmin || isModerator) {
        req.io.emit('commentDeleted', {
          comment: comment,
          post: post,
          message: `Your comment on ${post.title} has been deleted by ${isAdmin ? 'an admin' : 'a moderator'}`,
        });
      }


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

    const isAdmin = user.role === "admin";
    const isModerator = user.role === "moderator";
    const isCommentAuthor = comment.user_id.toString() === user._id.toString();

    const comment = await Comment.findById(id);

    if (!comment) {
      return next(new NotFound("Comment not found"));
    }

    // only the comment author, admin or moderator can update the comment
    if (!isAdmin && !isModerator && !isCommentAuthor) {
      return next(new Unauthorized("Not authorized to update this comment"));
    }

    comment.content = content || comment.content;

    await comment.save();

    if (isAdmin || isModerator) {
      const post = await Post.findById(comment.post_id);
      req.io.emit('commentUpdated', {
        comment: comment,
        message: `Your comment on ${post.title} has been updated by ${isAdmin ? 'an admin' : 'a moderator'}`,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Comment updated",
      data: comment,
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

const getCurrentUserComments = asyncHandler(async (req, res, next) => {
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

const getUserComments = asyncHandler(async (req, res, next) => {
  try {
    const {id} = req.params;
    const { page, limit, order } = req.query;

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const sortDirection = order === "asc" ? 1 : -1;
    const comments = await Comment.find({ user_id: id })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(parseInt(limit));


    res.status(200).json({
      status: "success",
      message: "User comments retrieved",
      data: comments,
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
  getCurrentUserComments,
  getUserComments,
};
