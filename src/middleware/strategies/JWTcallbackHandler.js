import { User } from "../../modules/user.model.js";
import { ApiError } from "../../util/apiError.js";

export const jwtCallbackHandler = async (jwt_payload, cb) => {
  try {
    console.log("Run JWT")
    const user = await User.findById(jwt_payload.id);
    if (!user) {
      return cb("Access denied due to invalid credentials[Unauthorized]", false);
    }
    return cb(null, user);
  } catch (err) {
    console.log(err);
    throw new ApiError(500, "Something went wrong During JWT Verification", [err]);
  }
};
