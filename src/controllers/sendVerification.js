import { ApiError } from "../util/apiError.js";
import { asyncHanlder } from "../util/asyncHandler.js";
import { TokenHandler } from "../util/tokenHandler.js";
import { sendEmailVerification } from "../util/sendEmailVerification.js";
export const sendVerification = asyncHanlder(async (req, res) => {
  /**
   * 1) Get user
   * 2) Generate token
   * 3) Send mail
   * 4) Handle error
   */
  const user = req.user;
  const tokens = new TokenHandler();
  const token = tokens.generateToken(user.id);
  if (!token) { 
    throw new ApiError(500, "Something went Wrong while Generating TOKEN", [
      "internal server error"
    ]);
  }
  const sendEmail = await sendEmailVerification(user.email,user.userName,token)
  console.log(sendEmail)
  res.send(user);
});
