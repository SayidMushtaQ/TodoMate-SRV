import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_AUTH_REDIRECT_URL } from "../constants.js";
import { User } from "../modules/user.model.js";
passport.use(
  new GoogleStrategy(
    {
      callbackURL: GOOGLE_AUTH_REDIRECT_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log("passport callback function fired:");
      const email = profile.emails[0].value;
      const userName = email.split("@")[0];
      const isVerified = profile.emails[0].verified;
      const provider = profile.provider;
      const googleID = profile.id;
      console.log({ userName }, { isVerified }, { provider }, { googleID });
      new User({
        userName,
        email,
        provider,
        googleID,
        isVerified
      }).save().then((newUser)=>{
        console.log("New user: ",newUser)
      });
    }
  )
);
