import { asyncHanlder } from "../util/asyncHandler.js";
import {UserSessionHandle} from '../util/authUserHandler.js'
import {ApiError} from '../util/apiError.js'
export const restrictToLoggedUserOnly = asyncHanlder(async(req,_,next)=>{
    const userSession = new UserSessionHandle();
    const localUserID = req.cookies.localuserid;
    const user = userSession.getUser(localUserID);
 
    if(!localUserID){
        throw new ApiError(400,"User not loged in")
    }
    if(!user){
        throw new ApiError(400,"User not loged in")
    }
    req.user = user;
    next();
})


/**
 * Authentication:
    1) Auth cookie handler
    2) Generate cookie and send
    3) Middleware
    4) Set it
 */