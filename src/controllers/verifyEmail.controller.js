import { User } from "../modules/user.model.js";
import { asyncHanlder } from "../util/asyncHandler.js";
import { ApiError } from "../util/apiError.js";
import { TokenHandler } from "../util/tokenHandler.js";
export const verifyEmail = asyncHanlder(async (req, res) => {
  const token = req.query.token;
  const tokens = new TokenHandler();
  const decode = tokens.verifyToken(token);
  if (!decode) {
    throw new ApiError(400, "Invalid token");
  }
  const user = await User.findById(decode.id);
  if (!user) {
    throw new ApiError(404, "User  not Found");
  }
  res.send(decode, user);
});
