import express from "express";
import { adminAuth } from "../middlewares/auth.middleware.js";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/create", adminAuth, createCategory);

router.route("/:id").delete(adminAuth, deleteCategory).put(adminAuth, updateCategory);

export default router;

// TODO: Add the category route to the server