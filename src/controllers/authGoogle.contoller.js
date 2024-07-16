import { asyncHanlder } from "../util/asyncHandler.js";

export const authGoogle = asyncHanlder(async(req,res)=>{
    res.send('google')
})