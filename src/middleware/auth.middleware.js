import { asyncHanlder } from "../util/asyncHandler.js";
import { UserTokenHandler } from "../util/authUserTokenHandler.js";
import { ApiError } from "../util/apiError.js";
import {excludedPaths} from '../constants.js'

export const requireAuth  = asyncHanlder(async (req, _, next) => {
  if(excludedPaths.includes(req.path)){
    return next();
  }
  const userToken = new UserTokenHandler();
  const token = req.cookies?.loginToken;
  req.user = null;
  if (!token) throw new ApiError(400, "User not loged in");

  const user = userToken.getUser(token);
  if (!user) throw new ApiError(400, "User not loged in");

  req.user = user;
  return next();
});

export function AllowTo(roles = []) {
  return asyncHanlder((req, res, next)=>{
    if (!req.user) return res.send("Redirect to Login");

    if (!roles.includes(req.user.role)) return res.end("Unothorized");
    return next();
  });
}

/**
 * Authentication:
1) Auth cookie handler
2) Generate cookie and send
3) Middleware
4) Set it
*/

//Based On Response Token
// const token = req.header('authorization')
// const user = userToken.getUser(token.split('Bearer ')[1]);
