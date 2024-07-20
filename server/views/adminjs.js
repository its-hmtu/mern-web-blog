import { adminJs } from "../index.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import PostContent from "./components/PostContent.js";
import AdminJS, { actions } from "adminjs";
import axios from "axios";
import { deleteComment } from "../controllers/comment.controller.js";

// AdminJS.registerComponent("PostContent", PostContent);

