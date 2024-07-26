import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { __dirname } from "../util/getCurrentPath.js";
import { ApiError } from "./apiError.js";

const privateKeyPath = path.join(__dirname, "..", "keys", "private.pem");
const publicKeyPath = path.join(__dirname, "..", "keys", "public.pem");

const PRIVATE_KEY = fs.readFileSync(privateKeyPath, "utf-8");
const PUBLIC_KEY = fs.readFileSync(publicKeyPath, "utf-8");


export class UserTokenHandler {
  setUser(user) {
    try {
      return jwt.sign(user, PRIVATE_KEY, { algorithm: "RS256" });
    } catch (err) {
      console.log(err);
      throw new ApiError(500, "Caused Error while Generationg TOKEN:", [err]);
    }
  }
  getUser(token) {
    try {
      return jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });
    } catch (err) {
      console.log(err);
      throw new ApiError(500, "Caused Error while get TOKEN:", [err]);
    }
  }
}

// /**
//  * Token Based - (State Less) Auth
//     1) User Token Handler
//     2) Generate token and set as a cookie
//     3) Middleware
//  */
