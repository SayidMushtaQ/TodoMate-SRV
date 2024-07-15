import { asyncHanlder } from "../util/asyncHandler.js";
import { ApiResponse } from "../util/apiResponse.js";
import { User } from "../modules/user.model.js";
import { ApiError } from "../util/apiError.js";
import { EMAIL_REGEX } from "../constants.js";
export const registerUser = asyncHanlder(async (req, res) => {
  /**
   * User Register - Api
   */
  /**
   * 1) Get data from user and validate(Basic)
   * 2) Email varification
   * 3) Check user already exist or not
   * 5) Store user data
   */

  const { userName, fullName, email, password, phone,role } = req.body;
  if ([fullName, userName, email, password, phone].some(val => val === "")) {
    throw new ApiError(400, "All fields are required", [
      "Please fill up all necessary fields"
    ]);
  }
  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError(400, "Please enter a valid email address", [
      "Email should be contained standard pattern"
    ]);
  }
  const isUserExist = await User.findOne({
    $or: [{ userName }, { email }]
  });
  if (isUserExist) {
    throw new ApiError(409, "User already exist");
  }

  const newUser = await User.create({
    userName,
    fullName,
    email,
    password,
    phone,
    role
  });
  const userRegisterRes = {
    userName: newUser.userName,
    email: newUser.email,
    fullName: newUser.fullName,
    role:newUser.role
  };

  res
    .status(201)
    .json(new ApiResponse(200, { userRegisterRes }, "Data received sucessfully"));
});
