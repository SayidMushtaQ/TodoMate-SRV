import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { __dirname } from "../util/getCurrentPath.js";
import { ApiError } from "./apiError.js";
import { User } from "../modules/user.model.js";


const publicKeyPath = path.join(__dirname, "..", "keys", "public.pem");
const PUBLIC_KEY = fs.readFileSync(publicKeyPath, "utf-8");

export const generateAccessAndRefreshToken = async userID => {
  try {
    const user = await User.findById(userID);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshTokne();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { refreshToken, accessToken, success: true };
  } catch (err) {
    console.log(err);
    throw new ApiError(500, "Caused Error while Generating TOKENs:", [err]);
  }
};

export const getUserFromToken = (token)=>{
  try {
    return jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });
  } catch (err) {
    console.log(err);
    throw new ApiError(500, "Caused Error while get TOKEN:", [err]);
  }
}
// /**
//  * Token Based - (State Less) Auth
//     1) User Token Handler
//     2) Generate token and set as a cookie
//     3) Middleware
//  */
