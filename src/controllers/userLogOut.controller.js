import { asyncHanlder } from "../util/asyncHandler.js";
import { ApiResponse } from "../util/apiResponse.js";
import { User } from "../modules/user.model.js";
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
    .cookie("accessToken")
    .cookie("refreshToken")
    .json(new ApiResponse(200, {}, "Logout successful"));
});
