import { registerUser } from "../controllers/userRegister.controller.js";
import { userLogin } from "../controllers/userLogin.controller.js";
import { Router } from "express";
import { userLogout } from "../controllers/userLogOut.controller.js";
import { userProfile } from "../controllers/userProfile.controller.js";
import passport from "passport";
import jwt from "jsonwebtoken";

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
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    console.log(token);
    res.cookie("token", token);
    res.redirect("/api/v1/users/user");
  }
);

export default router;
