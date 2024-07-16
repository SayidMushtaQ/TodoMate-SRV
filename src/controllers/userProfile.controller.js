import { asyncHanlder } from "../util/asyncHandler.js";

export const userProfile = asyncHanlder(async(req,res)=>{
    res.send("User Profile")
})