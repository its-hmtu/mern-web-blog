import express from "express";
import {
  createPost,
  deletePost,
  updatePost,
  getPosts,
  getSinglePost,
  likePost,
  addToReadingList,
  getReadingList,
  disableComment
} from "../controllers/post.controller.js";
import {
  userAuth,
  adminAuth,
  userOrAdminAuth,
} from "../middlewares/auth.middleware.js";
import { upload } from "../config/firebase.js";

const router = express.Router();

// router.get('/', getPosts)
// router.get('/', getPost)
// router.post('/create', userAuth, createPost)
// router.delete('/:postId', userAuth, deletePost)
// router.put('/update/:postId', userAuth, updatePost)
// TODO: delete post && update post routes

router.post(
  "/create",
  userAuth,
  upload.fields([
    {
      name: "main_image",
      maxCount: 1,
    },
    {
      name: "content_images",
      maxCount: 10,
    },
  ]),
  createPost
);

// route delete post should accept both user and admin roles to delete a post by id
router.delete("/:id", userAuth, deletePost);

router.put("/update/:id", userAuth, upload.fields([
  {
    name: "main_image",
    maxCount: 1,
  },
  {
    name: "content_images",
    maxCount: 10,
  },
]), updatePost);

router.get("/", getPosts);

router.get("/:id", getSinglePost);

// route like post should accept both user and admin roles to like a post by id
router.put("/:id", userAuth, likePost);

router.put("/reading-list/:id", userAuth, addToReadingList);

router.get('/reading-list', userAuth, getReadingList);

export default router;
