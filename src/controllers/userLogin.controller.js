import { asyncHanlder } from "../util/asyncHandler.js";
import { EMAIL_REGEX } from "../constants.js";
import { ApiError } from "../util/apiError.js";
import { User } from "../modules/user.model.js";
import { ApiResponse } from "../util/apiResponse.js";
import {v4 as UudV4} from 'uuid'
import {AuthSessionUser} from '../util/auth.js';
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

  const isUserExist = await User.findOne({
    $or: [{ userName }, { email }]
  });
  if (!isUserExist) {
    throw new ApiError(404, "User does not exist");
  }

  const comparePasswords = await isUserExist.isPasswordCorrect(password);
  if (!comparePasswords) {
    throw new ApiError(401, "Wrong credentials.");
  }

  const sessionID = UudV4();
  const userSession = new  AuthSessionUser()
  userSession.setUser(sessionID,isUserExist);

  res.cookie('uuid',sessionID)
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: isUserExist, redirectURL: "/dashboard" },
        "Login successful."
      )
    );
});
