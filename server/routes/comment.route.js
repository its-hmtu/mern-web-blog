import express from "express";
import {
  createComment,
  getPostComments,
  deleteComment,
  updateComment,
  getUserComments,
  getAllComments,
} from "../controllers/comment.controller.js";
import {
  userAuth,
  adminAuth,
  userOrAdminAuth,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getPostComments);

router.post("/create", userAuth, createComment);

router.route("/:id").delete(userAuth, deleteComment).put(userAuth, updateComment);

router.get("/admin", adminAuth, getAllComments);

router.get("/me", userOrAdminAuth, getUserComments);

export default router;
