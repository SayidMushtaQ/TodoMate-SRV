import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_AUTH_REDIRECT_URL } from "../constants.js";
import { User } from "../modules/user.model.js";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import fs from 'fs'

const publicKey = fs.readFileSync('./src/keys/public.pem','utf-8'); 

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracts from Authorization header as Bearer token
        ExtractJwt.fromBodyField("token"), // Extracts from a body field named 'token'
        ExtractJwt.fromUrlQueryParameter("token"), // Extracts from a query parameter named 'token'
        ExtractJwt.fromAuthHeaderWithScheme("JWT"), // Extracts from Authorization header with 'JWT' scheme
        cookieExtractor // Extracts from a cookie named 'jwt'
      ]),
      secretOrKey: publicKey,
      algorithms:['RS256']
    },
    (jwt_payload, cb) => {
      console.log('Rund JWT')
      console.log(jwt_payload)
      User.findById(jwt_payload._id)
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
