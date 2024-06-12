import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware.js";
import {
  friendRequestRecived,
  friendRequest,
  friendRequestSents,
  acceptFriendRequest,
  denigFriendRequest,
  getFriends,
} from "../controllers/fiendship.controllers.js";

const router = Router();

router.get("/friendship-requests/received", authRequired, friendRequestRecived);

router.post("/friend-request/:id", authRequired, friendRequest);

router.get("/friendship-requests/sent", authRequired, friendRequestSents);

router.post('/friendship-requests/:id/accept', authRequired, acceptFriendRequest)

router.delete('/friendship-requests/:id/reject', authRequired, denigFriendRequest)

router.get("/friends", authRequired, getFriends)

export default router;
