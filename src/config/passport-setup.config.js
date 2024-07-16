import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { AUTH_Redirect_URL } from "../constants.js";
import { User } from "../modules/user.model.js";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: AUTH_Redirect_URL
    },
    async (accessToken, refreshToken, profile, cb) => {
      const email = profile.emails[0].value;
      const userName = email.split("@")[0];
      const isVerified = profile.emails[0].verified;
      const fullName = profile.displayName;
      const provider = profile.provider;
      const googleID = profile.id
      
      const user = await User.create({
        userName,
        fullName,
        email,
        isVerified,
        provider,
        googleID
      });
      console.log("New user",user);
    }
  )
);
