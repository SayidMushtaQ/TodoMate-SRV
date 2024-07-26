import { User } from "../../modules/user.model.js";
export const googleCallbackHandler = async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const userName = email.split("@")[0];
    const isVerified = profile.emails[0].verified;
    const provider = profile.provider;
    const googleID = profile.id;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return done(null, userExist);
    } else {
      const newUser = await User.create({
        email,
        userName,
        provider,
        isVerified,
        googleID
      });
      return done(null, newUser);
    }
  } catch (err) {
    return done(err, null);
  }
};
