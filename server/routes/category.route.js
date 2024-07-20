import express from "express";
import { verifyRole, verifyToken } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/create", verifyToken, verifyRole(["admin"]), createCategory);

router
  .route("/:id")
  .delete(verifyToken, verifyRole(["admin"]), deleteCategory)
  .put(verifyToken, verifyRole(["admin", "editor"]), updateCategory);

export default router;

// TODO: Add the category route to the server
