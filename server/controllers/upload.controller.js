import {uploadFile } from '../config/firebase.js';
import {
  BadRequest,
  InternalServerError
} from "../errors/index.js"
import asyncHandler from 'express-async-handler';
import fs from "fs";

export const uploadFileToFirebase = asyncHandler(async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return next(new BadRequest("Please upload a file"));
    } else {
      const url = await uploadFile(file.path);
      fs.unlinkSync(file.path);
      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: url,
      });
    }
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});