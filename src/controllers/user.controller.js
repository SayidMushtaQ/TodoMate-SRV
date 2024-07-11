import {asyncHanlder} from '../util/asyncHandler.js';
import {ApiResponse} from '../util/apiResponse.js';
import {User} from '../modules/user.model.js';
export const registerUser = asyncHanlder(async(req,res)=>{
    console.log(req.body);
    // const registerUser = await User.create({

    // })
    res.status(200).json(
        new ApiResponse(200,{ok:'Ok'},'Data received sucessfully')
    )
})