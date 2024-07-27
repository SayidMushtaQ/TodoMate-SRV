import { asyncHanlder } from "../util/asyncHandler.js";
import { UserTokenHandler } from "../util/authUserTokenHandler.js";
import { ApiError } from "../util/apiError.js";
export const authRedirect = asyncHanlder((req, res) => {
  const userToken = new UserTokenHandler();
  const user = req.user;
  console.log(user)
  const token = userToken.setUser({
    id: user.id,
    userName: user.userName,
    email: user.email,
    role:user.role,
    provider:user.provider
  });
  if (!token) {
    throw new ApiError(500, "Token generating error..!!",["Something went wrong..!!",'Try again']);
  }
  return res.status(200).cookie("authToken", token).redirect("/api/v1/users/user");
});

//TODO
// .json(
//   new ApiResponse(200, { id: req.user.id, redirectURL: "/user" }, "Login successful.")
// )