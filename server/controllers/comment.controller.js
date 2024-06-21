import Comment from '../models/comment.model.js';
import asyncHandler from 'express-async-handler';

const createComment = asyncHandler(async (req, res) => {
  try {
    
  } catch (e) {
    res.status(500);
    throw new Error(`Server Error: ${e.message}`);
  }
})

const getPostComments = asyncHandler(async (req, res) => {
  try {
    const {post} = req.query;
    const comments = await Comment.find({post}).populate('user', 'username');

    if (!comments) {
      res.status(404);
      throw new Error('No comments found');
    } else {
      res.status(200).json({
        status: 'success',
        comments: comments
      });
    }
  } catch (e) {
    res.status(500);
    throw new Error(`Server Error: ${e.message}`);
  }
})

export { getPostComments }