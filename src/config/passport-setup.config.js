import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_AUTH_REDIRECT_URL } from "../constants.js";
import { User } from "../modules/user.model.js";

passport.serializeUser((user, cb) => {
  console.log("SerializedUser: ",user);
  cb(null, user.id);
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: GOOGLE_AUTH_REDIRECT_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("passport callback function fired:");
      const email = profile.emails[0].value;
      const userName = email.split("@")[0];
      const isVerified = profile.emails[0].verified;
      const provider = profile.provider;
      const googleID = profile.id;
      console.log({ email }, { userName }, { isVerified }, { provider }, { googleID });
      const userExist = await User.findOne({ email });

      if (userExist) {
        console.log("User is: ", userExist);
        cb(null,userExist);
      } else {
       const newUser =  await User.create({
          email,
          userName,
          provider,
          isVerified,
          googleID
        });
        cb(null,newUser);
      }
    }
  )
);
