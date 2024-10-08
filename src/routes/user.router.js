import { registerUser } from "../controllers/userRegister.controller.js";
import { userLogin } from "../controllers/userLogin.controller.js";
import { Router } from "express";
import { userLogout } from "../controllers/userLogOut.controller.js";
import { userProfile } from "../controllers/userProfile.controller.js";
import passport from "passport";
import { authRedirect } from "../controllers/authRedirect.controller.js";
import { refreshAccessToken } from "../controllers/refreshToken.controller.js";
import { sendVerificationToken } from "../controllers/sendVerificationToken.js";
import { verifyEmail } from "../controllers/verifyEmail.controller.js";
const router = Router();

router.route("/user").get(userProfile);
router.route("/register").post(registerUser);
router.route("/login").post(userLogin);
router.route("/logout").post(userLogout);
router.route("/refreshToken").post(refreshAccessToken);
router.route("/sendVerification").post(sendVerificationToken);
router.route("/verifyEmail").get(verifyEmail);

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
  authRedirect
);
//Github - AUTH
router
  .route("/githubAuth")
  .get(passport.authenticate("github", { scope: ["user:email"] }));

router.route("/githubAuth/redirect").get(
  passport.authenticate("github", {
    failureRedirect: "/api/v1/users/githubAuth",
    session: false
  }),
  authRedirect
);
export default router;
