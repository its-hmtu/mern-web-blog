import User from "../models/user.model.js";
import {
  NotFound,
  InternalServerError,
  Unauthorized,
  BadRequest,
  Forbidden,
} from "../errors/index.js";
import { adminAuth } from "../middlewares/auth.middleware.js";
import { makeAdmin, removeAdmin } from "../controllers/admin.controller.js";
import express from 'express'

const router = express.Router()

router.put('/make-admin', adminAuth, makeAdmin)

export default router