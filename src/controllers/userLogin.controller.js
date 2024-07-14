import { asyncHanlder } from "../util/asyncHandler.js";
import { EMAIL_REGEX } from "../constants.js";
import { ApiError } from "../util/apiError.js";
import { User } from "../modules/user.model.js";
import { ApiResponse } from "../util/apiResponse.js";
import {UserTokenHandler} from '../util/authUserTokenHandler.js'
export const userLogin = asyncHanlder(async (req, res) => {
  /**
   * User login
   */
  /**
   * 1) Get data and validate
   * 2) Find the user and validate
   * 3) Match the passwords
   * 4) Login
   */
  const { data, password } = req.body;
  const userToken = new UserTokenHandler();
  if ([data, password].some(val => val === "")) {
    throw new ApiError(400, "Email or userName ans password is required", [
      "Please fill up all necessary fields"
    ]);
  }
  let userName, email;
  if (EMAIL_REGEX.test(data)) {
    email = data;
  } else {
    userName = data;
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


  const uaserPayload = {
    _id:user.id,
    email:user.email,
    userName:user.userName,
    phone:user.phone
  }
  const token = userToken.setUser(uaserPayload);
  return res.status(200).cookie('loginToken',token).json(
    new ApiResponse(
      200,
      { user: user, redirectURL: "/dashboard" },
      "Login successful."
    )
  );
});
