import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { protectThisRoute } from "../middleware/message.middleware.js";

const router = express.Router();

router.post("/send/:id", protectThisRoute, sendMessage);
router.get("/:id", protectThisRoute, getMessages);

export default router;
