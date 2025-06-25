import express from "express"
import {  verifyToken } from "../middleware/authMiddleware.js";
import { generateBlog } from "../controllers/aiController.js";

const router = express.Router();

router.post('/generate', verifyToken, generateBlog);

export default router;