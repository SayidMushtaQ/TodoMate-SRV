import { ApiError } from "../util/apiError.js";
import { asyncHanlder } from "../util/asyncHandler.js";
import {AuthSessionUser} from '../util/auth.js';

export const restrictToLoggedUserOnly = asyncHanlder(async(req,res,next)=>{
    const session = new AuthSessionUser();
    const uuID = req.cookies?.uuid;
    const user = session.getUser(uuID);
    if(!uuID){
        throw new ApiError(400,"User not loged in")
    }
    if(!user){
        throw new ApiError(400,"User not loged in")
    }
    req.user = user;
    next()

})