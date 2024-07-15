import { asyncHanlder } from "../util/asyncHandler.js";
import { UserTokenHandler } from "../util/authUserTokenHandler.js";
import { ApiError } from "../util/apiError.js";
import {excludedPaths} from '../constants.js'

export const requireAuth  = asyncHanlder(async (req, _, next) => {
  if(excludedPaths.includes(req.path)) return next(); //Exclude for: Login and Register
  const userToken = new UserTokenHandler();
  const token = req.cookies?.loginToken;
  req.user = null;
  if (!token) throw new ApiError(401, "Access denied. No token provided. Please log in to obtain a token.",['Unauthorized']);

  const user = userToken.getUser(token);
  if (!user) throw new  ApiError(401, "Access denied. Please log in to continue.",['Unauthorized']);

  req.user = user;
  return next();
});

export function AllowTo(roles = []) {
  return asyncHanlder((req, res, next)=>{
    if (!req.user)  throw new ApiError(401, "Access denied. Please log in to continue.",['Unauthorized']);

    if (!roles.includes(req.user.role)) throw new ApiError(403, "Access denied. You do not have permission to access this resource. ",['Forbidden']);
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
