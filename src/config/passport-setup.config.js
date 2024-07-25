import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_AUTH_REDIRECT_URL } from "../constants.js";
import { User } from "../modules/user.model.js";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "sdhfhjsdfjn0932lkjsfdj309sdn34290sdflk3209lksoieui"
    },
    (jwt_payload, cb) => {
      console.log("Run JWT");
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        })
        .catch(err => console.error(err));
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      callbackURL: GOOGLE_AUTH_REDIRECT_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const userName = email.split("@")[0];
        const isVerified = profile.emails[0].verified;
        const provider = profile.provider;
        const googleID = profile.id;
        const userExist = await User.findOne({ email });

        if (userExist) {
          return done(null, userExist);
        } else {
          const newUser = await User.create({
            email,
            userName,
            provider,
            isVerified,
            googleID
          });
          return done(null, newUser);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
