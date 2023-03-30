import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import {
  getChat,
  getChats,
  createGroup,
  renameGroup,
  removeFromGroup,
  addUserToGroup,
} from "../controllers/chat.js";

router.route("/").post(getChat).get(authenticateUser,getChats);
router.route("/createGroup").post(authenticateUser,createGroup);
router.route("/renameGroup").patch(authenticateUser,renameGroup);
router.route("/removeFromGroup").patch(authenticateUser,removeFromGroup);
router.route("/addUserToGroup").patch(authenticateUser,addUserToGroup);

export default router;
