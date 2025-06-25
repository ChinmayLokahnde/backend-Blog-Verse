import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostBySlug,
  updatePost
} from "../controllers/postcontroller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);

// ✅ Keep only one POST route with upload and token verification
router.post('/', verifyToken, upload.single('thumbnail'), createPost);

// ✅ Keep only one PUT route with upload and token verification
router.put('/:slug', verifyToken, upload.single('thumbnail'), updatePost);

router.delete('/:slug', verifyToken, deletePost);

export default router;
