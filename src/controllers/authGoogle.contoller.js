import { asyncHanlder } from "../util/asyncHandler.js";

export const authGoogle = asyncHanlder(async(req,res)=>{
    console.log(req.user)
    res.send(req.user)
})