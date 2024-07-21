import User from "../models/user.model.js";
import {
  NotFound,
  InternalServerError,
  Unauthorized,
  BadRequest,
  Forbidden,
} from "../errors/index.js";
import { verifyToken, verifyRole } from "../middlewares/auth.middleware.js";
import { deleteUserAdmin, deletePostAdmin, updateUserAdmin } from "../controllers/admin.controller.js";
import express from 'express'

const router = express.Router()

router.delete('/delete-user', verifyToken, verifyRole(['admin']), deleteUserAdmin)

router.delete('/delete-post', verifyToken, verifyRole(['admin']), deletePostAdmin)

router.put('/update-user/:id', verifyToken, verifyRole(['admin']), updateUserAdmin)


export default router