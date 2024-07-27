import { User } from "../modules/user.model.js";
import { ApiError } from "../util/apiError.js";
import { ApiResponse } from "../util/apiResponse.js";
import { asyncHanlder } from "../util/asyncHandler.js";
import {
  getUserFromToken,
  generateAccessAndRefreshToken
} from "../util/authUserTokenHandler.js";

export const refreshAccessToken = asyncHanlder(async (req, res) => {
  const incommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incommingRefreshToken) {
    throw new ApiError(401, "Access denied. Refresh token is needed.", ["Unauthorized"]);
  }
  const token = getUserFromToken(incommingRefreshToken);
  const user = await User.findById(token.id);

  if (incommingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh token is expire or used");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user.id);
  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
      new ApiResponse(
        200,
        { id: user.id, accessToken, refreshToken },
        "Access token refresh Successfully"
      )
    );
});
