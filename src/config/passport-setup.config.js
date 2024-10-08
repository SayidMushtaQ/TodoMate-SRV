import fs from "fs";
import path from "path";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_AUTH_REDIRECT_URL } from "../constants.js";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { googleCallbackHandler } from "../middleware/strategies/googleCallbackHandler.js";
import { jwtCallbackHandler } from "../middleware/strategies/JWTcallbackHandler.js";
import { cookieExtractor } from "../util/cookieExtractor.js";
import { __dirname } from "../util/getCurrentPath.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { gitCallbackHandler } from "../middleware/strategies/gitCallbackhandler.js";

const pathToKey = path.join(__dirname, "..", "keys", "private.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");

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
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GIT_CLIENT_ID,
      clientSecret: process.env.GIT_CLIENT_SECRET,
      callbackURL: "/api/v1/users/githubAuth/redirect"
    },
    gitCallbackHandler
  )
);
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), 
        ExtractJwt.fromBodyField("accessToken"), 
        ExtractJwt.fromUrlQueryParameter("accessToken"), 
        ExtractJwt.fromAuthHeaderWithScheme("accessToken"), 
        cookieExtractor
      ]),
      secretOrKey: PUB_KEY,
      algorithms: ["RS256"]
    },
    jwtCallbackHandler
  )
);
