import { User } from "../../modules/user.model.js";
export const googleCallbackHandler = async (accessToken, refreshToken, profile, cb) => {
  try {
    const email = profile.emails[0].value;
    const userName = email.split("@")[0];
    const isVerified = profile.emails[0].verified;
    const provider = profile.provider;
    const googleID = profile.id;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return cb(null, userExist);
    } else {
      const newUser = await User.create({
        email,
        userName,
        provider,
        isVerified,
        googleID
      });
      return cb(null, newUser);
    }
  } catch (err) {
    return cb(err, null);
  }
};
