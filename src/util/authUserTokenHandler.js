import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { __dirname } from "../util/getCurrentPath.js";
import { ApiError } from "./apiError.js";
import { User } from "../modules/user.model.js";

const privateKeyPath = path.join(__dirname, "..", "keys", "private.pem");
const publicKeyPath = path.join(__dirname, "..", "keys", "public.pem");

const PRIVATE_KEY = fs.readFileSync(privateKeyPath, "utf-8");
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

// /**
//  * Token Based - (State Less) Auth
//     1) User Token Handler
//     2) Generate token and set as a cookie
//     3) Middleware
//  */
