import { Router } from "express";

import {
  searchUsers,
  getUser,
  updateUserRequest,
  updateUser,
} from "../controllers/users.controllers.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { updateSchema, updateUserRequestSchema } from "../schemas/user.schemas.js";


const router = Router();

router.get("/users", authRequired, searchUsers);

router.get("/users/:id", authRequired, getUser);

router.post("/update-user-request", authRequired, validateSchema(updateUserRequestSchema), updateUserRequest);

router.post("/update-user", authRequired, validateSchema(updateSchema), updateUser);

export default router;
