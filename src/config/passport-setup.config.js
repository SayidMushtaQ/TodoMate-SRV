import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_AUTH_REDIRECT_URL } from "../constants.js";
import { User } from "../modules/user.model.js";

passport.serializeUser((user, done) => {
  console.log(user.id)
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  User.findById(id).then((user) => {
    done(null, user.id);
});
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: GOOGLE_AUTH_REDIRECT_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const userName = email.split("@")[0];
      const isVerified = profile.emails[0].verified;
      const provider = profile.provider;
      const googleID = profile.id;
      const userExist = await User.findOne({ email });

      if (userExist) {
        done(null, userExist);
      } else {
        const newUser = await User.create({
          email,
          userName,
          provider,
          isVerified,
          googleID
        });
        done(null, newUser);
      }
    }
  )
);
