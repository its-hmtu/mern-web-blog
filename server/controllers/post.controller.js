import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import asyncHandler from "express-async-handler";
import {
  NotFound,
  BadRequest,
  Unauthorized,
  Forbidden,
  InternalServerError,
} from "../errors/index.js";
import fs from "fs";

// import { authorize, uploadFile, deleteFile } from "../config/google_drive.js";

import { deleteFileByUrl, uploadFile } from "../config/firebase.js";
import Category from "../models/category.model.js";
import { sendNotification } from "./notification.controller.js";

function calculateReadTime(content) {
  const text = content.replace(/(<([^>]+)>)/gi, "");
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;

  return Math.ceil(wordCount / wordsPerMinute);
}

const createPost = asyncHandler(async (req, res, next) => {
  try {
    const { title, content, category_name, main_image } = req.body;
    // const auth = await authorize();
    const user = req.user;

    const user_id = user._id;

    const author = user.full_name;

    const read_time = calculateReadTime(content);

    // get related posts id from any posts in the same category
    const category = await Category.findOne({ name: category_name });
    const relatedPosts = await Post.find({ category_id: category._id }).limit(
      10
    );
    console.log(relatedPosts);

    const post = await Post.create({
      user_id,
      author,
      title,
      content: content,
      category_id: category._id,
      category_name: category_name,
      main_image,
      images: contentImages,
      read_time,
      related_posts: relatedPosts.map((post) => post._id),
      profile_image_url: user.profile_image_url,
    });

    // update user posts count and add post to user posts list

    user.posts_count += 1;
    user.posts.push(post._id);
    await user.save();

    res.status(201).json({
      status: "success",
      message: "Post created",
      data: post,
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

const deletePost = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (user.posts.includes(id) || user.role !== "user") {
      const post = await Post.findById(id);
      if (!post) {
        next(new NotFound(`Post with id ${id} not found`));
        return;
      }

      // find user and remove post from user posts list
      if (!user) {
        next(new NotFound(`User with id ${post.user_id} not found`));
        return;
      }

      user.posts_count -= 1;
      if (user.posts_count <= 0) {
        user.posts_count = 0;
      }
      user.posts = user.posts.filter((p) => p.toString() !== id);
      await user.save();

      // count comments that user has made on post and remove comments from user comments list

      for (const id of post.comments) {
        const comment = await Comment.findById(id);
        const user_id = comment.user_id;
        const user = await User.findById(user_id);

        user.comments_count -= 1;
        if (user.comments_count <= 0) {
          user.comments_count = 0;
        }
        user.comments = user.comments.filter(
          (c) => c.toString() !== id.toString()
        );

        await user.save();
      }

      // delete comments associated with post
      await Comment.deleteMany({ post_id: id });

      await deleteFileByUrl(post.main_image);
      for (const image of post.images) {
        await deleteFileByUrl(image.url);
      }
      await Post.deleteOne({ _id: id });

      // if post deleted by admin, remove post from all users reading list or liked post list

      const users = await User.find({
        $or: [{ reading_list: { $in: [id] } }, { liked_post: { $in: [id] } }],
      });

      for (const user of users) {
        user.reading_list = user.reading_list.filter(
          (p) => p.toString() !== id
        );
        user.liked_post = user.liked_post.filter((p) => p.toString() !== id);
        await user.save();
      }

      if (user.role !== "user") {
        await sendNotification(post.user_id, "Your post has been deleted");
      }

      res.status(200).json({
        status: "success",
        message: "Post deleted",
      });
    } else {
      next(new Forbidden("Not authorized to delete post"));
      return;
    }
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

const updatePost = asyncHandler(async (req, res, next) => {
  // only author can update post
  try {
    const { id } = req.params;

    const user = req.user;

    if (user.posts.includes(id)) {
      const { title, content, category_name, main_image } = req.body;

      const post = await Post.findById(id);
      const category = await Category.findOne({ name: category_name });

      if (!post) {
        next(new NotFound(`Post with id ${id} not found`));
        return;
      }


      post.title = title || post.title;
      post.content = content || post.content;
      post.category_id = category._id || post.category_id;
      post.category_name = category_name || post.category_name;
      post.main_image = main_image || post.main_image;

      const read_time = calculateReadTime(post.content);

      post.read_time = read_time;

      await post.save();

      res.status(200).json({
        status: "success",
        message: "Post updated",
        data: post,
      });
    } else {
      next(new Forbidden("Not authorized to update post"));
      return;
    }
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

const getPosts = asyncHandler(async (req, res, next) => {
  try {
    const {
      page,
      limit,
      order,
      userId,
      category,
      slug,
      postId,
      postIds,
      searchTerm,
      currentUserId,
    } = req.query;

    const postIdsArray = postIds ? postIds.split(",") : [];
    const _page = Math.max(1, parseInt(page)) || 1;
    const _limit = parseInt(limit) || 10;
    let startIndex = (_page - 1) * _limit;

    let queryConditions = {
      ...(userId && { user_id: userId }),
      ...(category && { category_name: category }),
      ...(slug && { slug: slug }),
      ...(postId && { _id: postId }),
      ...(postIdsArray.length > 0 && { _id: { $in: postIdsArray } }),
      ...(searchTerm && {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { content: { $regex: searchTerm, $options: "i" } },
        ],
      }),
    };

    if (currentUserId && currentUserId.trim() !== "") {
      const currentUser = await User.findById(currentUserId);
      const currentUserBlockedList = currentUser
        ? currentUser.blocked_users
        : [];
      queryConditions = {
        ...queryConditions,
        user_id: { $nin: currentUserBlockedList },
      };
    }

    const sortDirection = order === "asc" ? 1 : -1;

    const posts = await Post.find(queryConditions)
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(_limit);

    const totalFilteredPosts = await Post.countDocuments(queryConditions);
    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      ...queryConditions,
      createdAt: { $gte: oneMonthAgo },
    });

    if (!posts) {
      next(new NotFound("No posts found"));
      return;
    }

    res.status(200).json({
      posts,
      totalPosts,
      totalFilteredPosts,
      lastMonthPosts,
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

const getSinglePost = asyncHandler(async (req, res, next) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOne({ slug });

    if (!post) {
      next(new NotFound(`Post with id ${post._id} not found`));
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Post found",
      data: post,
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

const likePost = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { like } = req.query;

    const post = await Post.findById(id);

    if (!post) {
      next(new NotFound(`Post with id ${id} not found`));
      return;
    }

    // if like is not before the equal sign, return bad request

    // check if user has already liked the post
    const user = req.user;
    console.log(user);

    if (like === "") {
      next(new BadRequest("Please provide like query"));
      return;
    }

    if (like === "true" && user.liked_post.includes(id)) {
      next(new BadRequest("Post already liked"));
      return;
    }

    if (like === "false" && !user.liked_post.includes(id)) {
      next(new BadRequest("Post not liked"));
      return;
    }

    if (like === "true") {
      post.likes_count += 1;

      await post.save();

      user.liked_post.push(post._id);
      await user.save();

      res.status(200).json({
        status: "success",
        message: "Post liked",
      });
    }
    if (like === "false") {
      post.likes_count -= 1;
      if (post.likes_count <= 0) {
        post.likes_count = 0;
      }
      await post.save();

      user.liked_post = user.liked_post.filter((p) => p.toString() !== id);
      await user.save();

      res.status(200).json({
        status: "success",
        message: "Post unliked",
      });
    }
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

const addToReadingList = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { add } = req.query;

    const post = await Post.findById(id);

    if (!post) {
      next(new NotFound(`Post with id ${id} not found`));
      return;
    }

    if (add === "") {
      next(new BadRequest("Please provide add query"));
      return;
    }

    if (add === "true" && user.reading_list.includes(id)) {
      next(new BadRequest("Post already in reading list"));
      return;
    }

    if (add === "false" && !user.reading_list.includes(id)) {
      next(new BadRequest("Post not in reading list"));
      return;
    }

    if (add === "true") {
      user.reading_list.push(post._id);
      await user.save();

      res.status(200).json({
        status: "success",
        message: "Post added to reading list",
      });
    }

    if (add === "false") {
      user.reading_list = user.reading_list.filter((p) => p.toString() !== id);
      await user.save();

      res.status(200).json({
        status: "success",
        message: "Post removed from reading list",
      });
    }
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

const getReadingList = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;

    let posts = [];

    if (!user || !user.reading_list || user.reading_list.length === 0) {
      return res.status(200).json({
        status: "success",
        data: posts,
      });
    } else {
      for (const id of user.reading_list) {
        const post = await Post.findById(id);
        if (post) {
          posts.push(post);
        }
      }

      res.status(200).json({
        status: "success",
        data: posts,
      })
    }
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

const disableComment = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { disable } = req.query;
    const user = req.user;

    const post = await Post.findById(id);
    if (!post) {
      next(new NotFound(`Post with id ${id} not found`));
      return;
    }

    if (
      user._id.toString() === post.user_id.toString() ||
      user.role === "admin"
    ) {
      if (disable === "") {
        next(new BadRequest("Please provide disable query"));
        return;
      }

      if (disable === "true") {
        post.is_comment_disabled = true;
        await post.save();

        res.status(200).json({
          status: "success",
          message: "Comment disabled",
        });
      }

      if (disable === "false") {
        post.is_comment_disabled = false;
        await post.save();

        res.status(200).json({
          status: "success",
          message: "Comment enabled",
        });
      }
    } else {
      next(new Forbidden("Not authorized to disable comments"));
      return;
    }
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

const getUserPosts = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page, limit, order } = req.query;
    const user = await User.findById(id);

    if (!user) {
      next(new NotFound(`User with id ${id} not found`));
      return;
    }

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const sortDirection = order === "asc" ? 1 : -1;
    const posts = await Post.find({ user_id: id })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(parseInt(limit));

    const totalPosts = await Post.countDocuments({ user_id: id });

    res.status(200).json({
      status: "success",
      data: {
        posts,
        totalPosts,
      },
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

export {
  createPost,
  deletePost,
  updatePost,
  getPosts,
  getSinglePost,
  likePost,
  addToReadingList,
  getReadingList,
  disableComment,
  getUserPosts,
};
