import express from "express";
const router = express.Router();
import { 
  register, 
  login, 
  searchUser,
  updateUserName,
  updateUserBio,
  updateUserAvatar,
  updateUserPassword,
  getUserInfo
} from "../controllers/auth.js";
import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

import authenticateUser from "../middleware/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/users").get(authenticateUser, searchUser);
router.route("/getUserinfos/:id").get(authenticateUser,getUserInfo);
//update user infos

router.route("/updateUserName/:id").patch(authenticateUser,updateUserName);
router.route("/updateUserBio/:id").patch(authenticateUser,updateUserBio);
router.route("/updateUserAvatar/:id").patch(authenticateUser,updateUserAvatar);
router.route("/updateUserPassword/:id").patch(authenticateUser,updateUserPassword);



export default router;
