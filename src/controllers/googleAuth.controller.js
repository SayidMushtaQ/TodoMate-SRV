import { asyncHanlder } from "../util/asyncHandler.js";
import { UserTokenHandler } from "../util/authUserTokenHandler.js";
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
    .redirect("/api/v1/users/user")
  });
  
  //TODO
  // .json(
  //   new ApiResponse(200, { id: req.user.id, redirectURL: "/user" }, "Login successful.")
  // )