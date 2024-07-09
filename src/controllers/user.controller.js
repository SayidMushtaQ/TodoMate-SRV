import {asyncHanlder} from '../util/asyncHandler.js';
import {ApiResponse} from '../util/apiResponse.js';
export const registerUser = asyncHanlder((req,res)=>{
    res.status(200).json(
        new ApiResponse(200,{ok:'Ok'},'Data received sucessfully')
    )
})