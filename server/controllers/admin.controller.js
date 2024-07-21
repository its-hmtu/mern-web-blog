import User from '../models/user.model.js'
import asyncHandler from 'express-async-handler'
import {
  NotFound, 
  Forbidden,
  InternalServerError,
  BadRequest,
  Unauthorized
} from '../errors/index.js'
import Comment from '../models/comment.model.js';
import Post from '../models/post.model.js';
import { sendEmailNotification } from '../utils/mailer.js';
// import { authorize, clearFiles } from '../config/google_drive.js'

// export const changeRole = asyncHandler(async (req, res, next) => {
//   try {
//     const { id } = req.query;
//     const 
//     const user = await User.findById(id);

//     if (!user) {
//       return next(new NotFound('User not found'))
//     }

//     if (user.role === 'admin') {
//       return next(new Forbidden('Cannot change role of admin'))
//     }


// })

export const deleteUserAdmin = asyncHandler(async (req, res, next) => {
  try {
    const admin = req.user;
    const { ids } = req.query;
    
    const users = ids ? ids.split(",") : [];

    for (let user of users) {
      user = await User.findById(user);
      if (user.role === 'admin') {
        return next(new Forbidden('Cannot delete admin'))
      }

      const posts = await Post.find({ user_id: user._id });
  
      if (!user) {
        return next(new NotFound('User not found'))
      }
  
      if (user.role === 'admin') {
        return next(new Forbidden('Cannot delete admin'))
      }
  
      await Comment.deleteMany({ user_id: user._id });
      await Post.deleteMany({user_id: user._id});
      
      for (const post of posts) {
        await Comment.deleteMany({ post_id: post._id });
      }
  
      const options = {
        userId: user._id,
        fullName: user.full_name,
        userEmail: user.email,
        subject: "Account deleted",
        text: `Your account has been deleted by an admin`,
      };
      await sendEmailNotification(options);
    
      await User.findByIdAndDelete(user._id);
  
    }
    
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    })
  } catch (e) {
    next(new InternalServerError(e.message))
  }
})

export const deletePostAdmin = asyncHandler(async (req, res, next) => {
  try {
    const admin = req.user;
    const { ids } = req.query;
    
    const posts = ids ? ids.split(",") : [];

    for (let post of posts) {
      post = await Post.findById(post);

    if (!post) {
      return next(new NotFound('Post not found'))
    }

    for (const comment of post.comments) {
      const user = await User.findById(comment.user_id);

      user.comments = user.comments.filter(c => c.toString() !== comment._id.toString());
      user.comments_count -= 1;
      if (user.comments_count < 0) {
        user.comments_count = 0;
      }
      await Comment.findByIdAndDelete(comment);

      await user.save();
    }
    await Post.findByIdAndDelete(post._id);

    const user = await User.findById(post.user_id);

    user.posts = user.posts.filter(p => p.toString() !== post._id.toString());
    user.posts_count -= 1;
    if (user.posts_count < 0) {
      user.posts_count = 0;
    }

    if (user.reading_list.includes(post._id)) {
      user.reading_list = user.reading_list.filter(p => p.toString() !== post._id.toString());
    }

    if (user.liked_post.includes(post._id)) {
      user.liked_post = user.liked_post.filter(p => p.toString() !== post._id.toString());
    }

    await user.save();

    await sendEmailNotification({
      userId: user._id,
      fullName: user.full_name,
      userEmail: user.email,
      subject: "Post deleted",
      text: `Your post has been deleted by an admin`,
    });
  }

    res.status(200).json({
      status: 'success',
      message: 'Post deleted successfully',
    })
  } catch (e) {
    next(new InternalServerError(e.message))
  }
})

export const updateUserAdmin = asyncHandler(async (req, res, next) => {
  try {
    const admin = req.user;
    const { id } = req.params;
    const {
      full_name,
      user_name,
      email,
      role,
      password,
      is_email_verified,
      is_banned,
      banned_reason,
      banned_date,
      banned_by,
      profile_image_url,
      posts,
      comments,
      posts_count,
      comments_count,
      reading_list,
      liked_post,
      bio,
      location,
      blocked_users,
      is_create_post_blocked,
      is_comment_blocked,
      followers_count,
      following,
      following_categories,
      slug
    } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return next(new NotFound('User not found'))
    }

    user.full_name = full_name || user.full_name;
    user.user_name = user_name || user.user_name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.password = password || user.password;
    user.is_email_verified = is_email_verified || user.is_email_verified;
    user.is_banned = is_banned || user.is_banned;
    user.banned_reason = banned_reason || user.banned_reason;
    user.banned_date = banned_date || user.banned_date;
    user.banned_by = banned_by || user.banned_by;
    user.profile_image_url = profile_image_url || user.profile_image_url;
    user.posts = posts || user.posts;
    user.comments = comments || user.comments;
    user.posts_count = posts_count || user.posts_count;
    user.comments_count = comments_count || user.comments_count;
    user.reading_list = reading_list || user.reading_list;
    user.liked_post = liked_post || user.liked_post;
    user.bio = bio || user.bio;
    user.location = location || user.location;
    user.blocked_users = blocked_users || user.blocked_users;
    user.is_create_post_blocked = is_create_post_blocked || user.is_create_post_blocked;
    user.is_comment_blocked = is_comment_blocked || user.is_comment_blocked;
    user.followers_count = followers_count || user.followers_count;
    user.following = following || user.following;
    user.following_categories = following_categories || user.following_categories;
    user.slug = slug || user.slug;
  
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: user
    })
  } catch (e) {
    next(new InternalServerError(e.message))
  }
})

    

    

