import express from "express";

import {
  createPost,
  deletePost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id/like", auth, likePost);
router.put("/:id/update", auth, updatePost);
router.delete("/:id/delete", auth, deletePost);

export default router;
