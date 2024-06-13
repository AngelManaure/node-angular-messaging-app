import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware.js";
import {
  messageIn,
  messageNotification,
  sendMessage,
} from "../controllers/message.controller.js";

const router = Router();

router.get("/message/notification", authRequired, messageNotification);

router.get("/message-in/:id", authRequired, messageIn);

router.post("/message-to/:id", authRequired, sendMessage);

export default router;
