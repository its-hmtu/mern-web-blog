import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import {
  NotFound,
  BadRequest,
  Unauthorized,
  Forbidden,
  InternalServerError,
} from "../errors/index.js"
import fs from "fs";

import { authorize, uploadFile, deleteFile } from "../config/google_drive.js";

function calculateReadTime(content) {
  const text = content.replace(/(<([^>]+)>)/gi, "");
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;

  return Math.ceil(wordCount / wordsPerMinute);
}

const createPost = asyncHandler(async (req, res, next) => {
  try {
    const {title, content, category} = req.body;
    const auth = await authorize();
    const user = req.user;

    let mainImage = null;
    if (req.files['main_image']) {
      const mainImageFile = req.files['main_image'][0];
      const response = await uploadFile(auth, mainImageFile.path);
      mainImage = `https://drive.google.com/thumbnail?id=${response.data.id}`;
      fs.unlinkSync(mainImageFile.path);
    }

    const contentImages = [];
    if (req.files['content_images']) {
      const contentImagesFiles = req.files['content_images'];
      for (const file of contentImagesFiles) {
        const response = await uploadFile(auth, file.path);
        contentImages.push({
          url: `https://drive.google.com/thumbnail?id=${response.data.id}`,
          height: response.height,
          width: response.width,
        })
        fs.unlinkSync(file.path);
      }
      console.log(contentImages)
    }

    const user_id = user._id;

    const author = user.full_name;

    const read_time = calculateReadTime(content);

    const post = await Post.create({
      user_id,
      author,
      title,
      content,
      category,
      main_image: mainImage,
      images: contentImages,
      read_time,
    })

    // update user posts count and add post to user posts list

    user.posts_count += 1;
    user.posts.push(post._id);
    await user.save();

    res.status(201).json({
      status: 'success',
      message: 'Post created',
      data: post,
    })
  } catch (e) {
    next(new InternalServerError(e.message))
  }
})

const deletePost = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      next(new NotFound(`Post with id ${id} not found`))
      return;
    }

    // find user and remove post from user posts list
    const user = await User.findById(post.user_id);
    if (!user) {
      next(new NotFound(`User with id ${post.user_id} not found`))
      return;
    }

    user.posts_count -= 1;
    user.posts = user.posts.filter(p => p.toString() !== id);
    await user.save();

    // delete images from google drive
    const auth = await authorize();
    await deleteFile(auth, post.main_image.split("=")[1]);

    for (const image of post.images) {
      await deleteFile(auth, image.url.split("=")[1]);
    }

    await Post.deleteOne({ _id: id });
    
    res.status(200).json({
      status: 'success',
      message: 'Post deleted',
    })
  } catch (e) {
    next(new InternalServerError(e.message));
  }
})

const updatePost = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    
    const post = await Post.findById(id);

    if (!post) {
      next(new NotFound(`Post with id ${id} not found`))
      return;
    }

    const auth = await authorize();


  } catch (e) {
    next(new InternalServerError(e.message));
  }
})

export { createPost, deletePost, updatePost }
