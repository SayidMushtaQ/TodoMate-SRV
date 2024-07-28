import { ApiError } from "../util/apiError.js";
import { ApiResponse } from "../util/apiResponse.js";
import { asyncHanlder } from "../util/asyncHandler.js";
import { TokenHandler } from "../util/tokenHandler.js";
import { sendEmailVerification } from "../util/sendEmailVerification.js";
export const sendVerification = asyncHanlder(async (req, res) => {
  const user = req.user;
  const tokens = new TokenHandler();
  const token = tokens.generateToken(user.id);
  if (!token) {
    throw new ApiError(500, "Something went Wrong while Generating TOKEN", [
      "internal server error"
    ]);
  }
  const sendEmail = await sendEmailVerification(user.email, user.userName, token);
  if (!sendEmail.success) {
    throw new ApiError(
      500,
      "Something went wrong During Sending Email Verification..!!",
      ["Internal Server Error"]
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, { }, "Email Verification URI Send Succesfully"));
});
