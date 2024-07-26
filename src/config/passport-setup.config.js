import fs from "fs";
import path from "path";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_AUTH_REDIRECT_URL } from "../constants.js";
import { User } from "../modules/user.model.js";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { googleCallbackHandler } from "../middleware/strategies/googleCallbackHandler.js";
import { jwtCallbackHandler } from "../middleware/strategies/JWTcallbackHandler.js";
import { cookieExtractor } from "../util/cookieExtractor.js";
import { __dirname } from "../util/getCurrentPath.js";

const pathToKey = path.join(__dirname, "..", "keys", "private.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracts from Authorization header as Bearer token
        ExtractJwt.fromBodyField("authToken"), // Extracts from a body field named 'token'
        ExtractJwt.fromUrlQueryParameter("authToken"), // Extracts from a query parameter named 'token'
        ExtractJwt.fromAuthHeaderWithScheme("JWT"), // Extracts from Authorization header with 'JWT' scheme
        cookieExtractor // Extracts from a cookie named 'jwt'
      ]),
      secretOrKey: PUB_KEY,
      algorithms: ["RS256"]
    },
    jwtCallbackHandler
  )
);
passport.use(
  new GoogleStrategy(
    {
      callbackURL: GOOGLE_AUTH_REDIRECT_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    googleCallbackHandler
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});


passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id);
    cb(null, user);
  } catch (err) {
    cb(["An error occurred while extracting data from the local.", err], null);
  }
});
