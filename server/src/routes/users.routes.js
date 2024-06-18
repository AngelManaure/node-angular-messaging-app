import { Router } from "express";

import {
  searchUsers,
  getUser,
} from "../controllers/users.controllers.js";
import { authRequired } from "../middlewares/auth.middleware.js";



const router = Router();

router.get("/users", authRequired, searchUsers);

router.get("/users/:id", authRequired, getUser);

export default router;
