import { asyncHanlder } from "../util/asyncHandler.js";

export const googleRedirect = asyncHanlder(async(req,res)=>{
    res.send(req.user)
})