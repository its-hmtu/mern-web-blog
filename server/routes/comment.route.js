import express from "express";
import {
  createComment,
  getPostComments,
  deleteComment,
  updateComment,
  getCurrentUserComments,
  getAllComments,
  getUserComments,
} from "../controllers/comment.controller.js";
import {
  verifyToken, verifyRole
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getPostComments);

router.post("/create", verifyToken, verifyRole(["user", "editor", "moderator", "admin"]), createComment);

router.route("/:id").delete(verifyToken, verifyRole(["user", "moderator", "admin"]), deleteComment).put(verifyToken, verifyRole(["user", "moderator", "admin"]), updateComment);

// router.get("/admin", verifyToken, getAllComments);

router.get("/me", verifyToken, verifyRole(["user", "editor", "moderator", "admin"]), getCurrentUserComments);

router.get("/user/:id", verifyToken, verifyRole(["user", "editor", "moderator", "admin"]), getUserComments);

export default router;
