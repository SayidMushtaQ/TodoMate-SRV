import { asyncHanlder } from "../util/asyncHandler.js";

export const userLogout = asyncHanlder(async(req,res)=>{
    res.send('logout')
})