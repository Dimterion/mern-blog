import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  getPostComments,
  createComment,
  getComments,
  editComment,
  likeComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/getPostComments/:postId", getPostComments);
router.post("/create", verifyToken, createComment);
router.get("/getComments", verifyToken, getComments);
router.put("/editComment/:commentId", verifyToken, editComment);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);

export default router;
