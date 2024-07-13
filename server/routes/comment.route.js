import express from "express";
import {
  createComment,
  getPostComments,
  deleteComment,
  updateComment
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


export default router;
