import { asyncHanlder } from "../../util/asyncHandler.js";
import {User} from '../../modules/user.model.js';
import { ApiResponse } from "../../util/apiResponse.js";

export const getAllUsers = asyncHanlder(async(req,res)=>{
    const users = await User.find({});

    res.status(200).json(
        new ApiResponse(200,users,'All users fetched successfully.')
    )
})