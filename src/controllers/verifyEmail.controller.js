import { User } from "../modules/user.model.js";
import { asyncHanlder } from "../util/asyncHandler.js";
import { ApiError } from "../util/apiError.js";
import { ApiResponse } from "../util/apiResponse.js";
import { TokenHandler } from "../util/tokenHandler.js";
export const verifyEmail = asyncHanlder(async (req, res) => {
  const token = req.query.token;
  const tokens = new TokenHandler();
  const decode = tokens.verifyToken(token);
  if (!decode) {
    throw new ApiError(400, "Invalid token");
  }
  const user = await User.findById(decode.id);

  if (!user) {
    throw new ApiError(404, "User  not Found");
  }
  if (user.isVerified) {
    throw new ApiError(401, "User Already Verified");
  }
  user.isVerified = true;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, { email: user.email }, "Email Verified Successfully"));
});
