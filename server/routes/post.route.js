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
  disableComment,
  getUserPosts,
  updateViewsCount,
} from "../controllers/post.controller.js";
import {
  verifyToken, verifyRole
} from "../middlewares/auth.middleware.js";
import { upload } from "../config/firebase.js";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  verifyRole(["user", "admin", "editor", "moderator"]),
  createPost
);

// route delete post should accept both user and admin roles to delete a post by id
router.delete("/:id", verifyToken, verifyRole(["user", "admin", "editor", "moderator"]), deletePost);

router.post("/update/:id", verifyToken, updatePost);

router.get("/", getPosts);

router.get("/:slug", getSinglePost);

// route like post should accept both user and admin roles to like a post by id
router.put("/:id", verifyToken, verifyRole(["user", "admin", "editor", "moderator"]), likePost);

router.put("/reading-list/:id", verifyToken, verifyRole(["user", "admin", "editor", "moderator"]), addToReadingList);

router.get('/reading-list', verifyToken, verifyRole(["user", "admin"]), getReadingList);

router.put("/disable-comment/:id", verifyToken, verifyRole(["admin", "editor", "moderator"]), disableComment);

router.get("/user/:id", verifyToken, verifyRole(["user", "admin", "editor", "moderator"]), getUserPosts);

router.post("/views-count", updateViewsCount);
export default router;
