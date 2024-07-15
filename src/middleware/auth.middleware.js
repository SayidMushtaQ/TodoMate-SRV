import { asyncHanlder } from "../util/asyncHandler.js";
import {UserTokenHandler} from '../util/authUserTokenHandler.js'
import {ApiError} from '../util/apiError.js'
export const restrictToLoggedUserOnly = asyncHanlder(async(req,_,next)=>{
    const userToken = new UserTokenHandler();
    //Based on Cookie
    const token = req.cookies?.loginToken;
    const user = userToken.getUser(token);

    //Based On Response Token 
    // const token = req.header('authorization')
    // const user = userToken.getUser(token.split('Bearer ')[1]);
 
    if(!token){
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