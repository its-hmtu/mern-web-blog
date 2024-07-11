import express from 'express';
import multer from 'multer'
import { userAuth } from '../middlewares/auth.middleware.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
})

const router = express.Router();

router.post('/', userAuth, upload.single('main-image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file selected.')
    }
    res.send(`/${ req.file.path }`)
  } catch (e) {
    console.error(e)
  }
})

export default router;