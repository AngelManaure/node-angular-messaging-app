import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware.js";
import {
  friendRequestRecived,
  friendRequest,
  friendRequestSents,
  acceptFriendRequest,
  denigFriendRequest,
  getFriends,
  isUserFriend,
  deleteFriendRequest,
  deleteReq
} from "../controllers/fiendship.controllers.js";

const router = Router();

router.delete("/delete", deleteReq)

router.get("/is-friend/:id", authRequired, isUserFriend)

router.get("/friendship-requests/received", authRequired, friendRequestRecived);

router.post("/friend-request/:id", authRequired, friendRequest);

router.delete("/friend-request/delete/:id", authRequired, deleteFriendRequest)


router.get("/friendship-requests/sent/:id", authRequired, friendRequestSents);

router.post('/friendship-requests/accept/:id', authRequired, acceptFriendRequest);

router.delete('/friendship-requests/:id/reject', authRequired, denigFriendRequest);

router.get("/friends", authRequired, getFriends);

export default router;
