import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost
} from '../controllers/post.controller.js'
import { userAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getPosts)
// router.get('/', getPost)
// router.post('/create', userAuth, createPost)
// router.delete('/:postId', userAuth, deletePost)
// router.put('/update/:postId', userAuth, updatePost)
// TODO: delete post && update post routes

export default router;