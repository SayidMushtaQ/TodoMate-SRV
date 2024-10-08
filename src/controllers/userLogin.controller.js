import { asyncHanlder } from "../util/asyncHandler.js";
import { EMAIL_REGEX } from "../constants.js";
import { ApiError } from "../util/apiError.js";
import { User } from "../modules/user.model.js";
import { ApiResponse } from "../util/apiResponse.js";
import { generateAccessAndRefreshToken } from "../util/authUserTokenHandler.js";
import { COOKIE_OPTIONS } from "../constants.js";
export const userLogin = asyncHanlder(async (req, res) => {
  const { userInput, password } = req.body;
  if ([userInput, password].some(val => val === "")) {
    throw new ApiError(400, "Email or userName ans password is required", [
      "Please fill up all necessary fields"
    ]);
  }
  let userName, email;
  if (EMAIL_REGEX.test(userInput)) {
    email = userInput;
  } else {
    userName = userInput;
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }]
  });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const comparePasswords = await user.isPasswordCorrect(password);
  if (!comparePasswords) {
    throw new ApiError(401, "Wrong credentials.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user.id);
  return res
    .status(200)
    .cookie("accessToken", accessToken,COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken,COOKIE_OPTIONS)
    .json(
      // If you used -> Header Authorization so then u need to send token as json
      new ApiResponse(
        200,
        { id: user.id, redirectURL: "/user", accessToken, refreshToken },
        "Login successful"
      )
    );
});
