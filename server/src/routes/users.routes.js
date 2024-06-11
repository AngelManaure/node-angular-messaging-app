import { Router } from "express";
import { getUsers, getUser} from "../controllers/users.controllers.js";

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);

export default router;