import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostBySlug,
  updatePost
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);

router.post('/', verifyToken, upload.single('thumbnail'), createPost);

router.put('/:slug', verifyToken, upload.single('thumbnail'), updatePost);

router.delete('/:slug', verifyToken, deletePost);

export default router;
