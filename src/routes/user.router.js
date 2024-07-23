import { registerUser } from "../controllers/userRegister.controller.js";
import { userLogin } from "../controllers/userLogin.controller.js";
import { Router } from "express";
import { userLogout } from "../controllers/userLogOut.controller.js";
import { userProfile } from "../controllers/userProfile.controller.js";
import passport from "passport";

const router = Router();

router.route("/user").get(userProfile);
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
    successRedirect: "/api/v1/users/user"
  })
);

router.get("/login", (req, res) => {
  res.send(`  <main>
            <a class="google-btn" href="/api/v1/users/googleAuth">Google+</a>
        </main>`);
});
export default router;
