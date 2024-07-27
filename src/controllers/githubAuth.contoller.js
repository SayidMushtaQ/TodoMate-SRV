import { asyncHanlder } from "../util/asyncHandler.js";

export const gitHubAuthHandler = asyncHanlder((req,res,next)=>{
    res.send(req.user)
})