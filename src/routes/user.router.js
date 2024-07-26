import { registerUser } from "../controllers/userRegister.controller.js";
import { userLogin } from "../controllers/userLogin.controller.js";
import { Router } from "express";
import { userLogout } from "../controllers/userLogOut.controller.js";
import { userProfile } from "../controllers/userProfile.controller.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { goolgeAuthHandler } from "../controllers/googleAuth.controller.js";

const router = Router();

router.route("/user").get(passport.authenticate("jwt", { session: false }), userProfile);
router.route("/register").post(registerUser);
router.route("/login").post(userLogin);
router.route("/userLogout").post(userLogout);

// Google - Auth

router.route("/googleAuth").get(
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.route("/googleAuth/redirect").get(
  passport.authenticate("google", {
    failureRedirect: "/api/v1/users/googleAuth",
    session: false
  }),
  goolgeAuthHandler
);

export default router;
