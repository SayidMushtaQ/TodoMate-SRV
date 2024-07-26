import { asyncHanlder } from "../util/asyncHandler.js";
import { UserTokenHandler } from "../util/authUserTokenHandler.js";
import { ApiResponse } from "../util/apiResponse.js";
import { ApiError } from "../util/apiError.js";

export const goolgeAuthHandler = asyncHanlder((req, res) => {
  const userToken = new UserTokenHandler();
  const token = userToken.setUser({ id: req.user.id });
  if (!token) {
    throw new ApiError(401, "Token is missing..!!");
  }
  return res
    .status(200)
    .cookie("authToken", token)
    .json(
      new ApiResponse(200, { id: req.user.id, redirectURL: "/user" }, "Login successful.")
    )
    .redirect("/api/v1/users/user");
});
