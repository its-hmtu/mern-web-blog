import express from 'express';
import multer from 'multer'
import { verifyToken } from '../middlewares/auth.middleware.js';
import { upload } from '../config/firebase.js';
import { uploadFileToFirebase } from '../controllers/upload.controller.js';

const router = express.Router();

router.post('/', verifyToken, upload.single('image'), uploadFileToFirebase);

export default router;