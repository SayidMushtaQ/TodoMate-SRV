import { asyncHanlder } from "../util/asyncHandler.js";
import {ApiResponse} from '../util/apiResponse.js'
export const userProfile = asyncHanlder(async (req, res) => {
  const user = {
    userNmae:req.user.userName,
    email:req.user.email,
    provider:req.user.provider,
    role:req.user.role
  }
  res
  .status(201)
  .json(new ApiResponse(200, { user }, "Data fetched sucessfully"));
});
