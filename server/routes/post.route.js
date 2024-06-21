import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost
} from '../controllers/post.controller.js'
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getPosts)
// router.get('/', getPost)
router.post('/create', protect, createPost)
router.delete('/:postId', protect, deletePost)
router.put('/update/:postId', protect, updatePost)
// TODO: delete post && update post routes

export default router;