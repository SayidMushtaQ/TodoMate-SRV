import { asyncHanlder } from "../util/asyncHandler.js";
import { ApiResponse } from "../util/apiResponse.js";
import { User } from "../modules/user.model.js";
import { COOKIE_OPTIONS } from "../constants.js";
export const userLogout = asyncHanlder(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user.id,
    {
      $unset: {
        refreshToken: true
      }
    },
    { new: true }
  );
  return res
    .status(200)
    .cookie("accessToken",COOKIE_OPTIONS)
    .cookie("refreshToken",COOKIE_OPTIONS)
    .json(new ApiResponse(200, {}, "Logout successful"));
});
