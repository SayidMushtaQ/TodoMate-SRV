import { asyncHanlder } from "../util/asyncHandler.js";
import { ApiError } from "../util/apiError.js";
import { generateAccessAndRefreshToken } from "../util/authUserTokenHandler.js";
import { COOKIE_OPTIONS } from "../constants.js";
export const authRedirect = asyncHanlder(async (req, res) => {
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(req.user.id);
  if ([accessToken, refreshToken].some(val => val === "")) {
    throw new ApiError(500, "Token generating error..!!", [
      "Something went wrong..!!",
      "Try again"
    ]);
  }
  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .redirect("/api/v1/users/user");
});

//TODO
// .json(
//   new ApiResponse(200, { id: req.user.id, redirectURL: "/user" }, "Login successful.")
// )
