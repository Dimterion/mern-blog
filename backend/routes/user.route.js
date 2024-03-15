import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  test,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  signout,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.get("/:userId", getUser);
router.get("/getusers", verifyToken, getUsers);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);

export default router;
