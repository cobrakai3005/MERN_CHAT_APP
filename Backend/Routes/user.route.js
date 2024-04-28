import express from "express";
import { protectThisRoute } from "../middleware/message.middleware.js";
import {
  getCurrentUser,
  getUserForSideBar,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectThisRoute, getUserForSideBar);
router.get("/current-user", protectThisRoute, getCurrentUser);

export default router;
