import { User } from "../../modules/user.model.js";
export const googleCallbackHandler = async (accessToken, refreshToken, profile, cb) => {
  try {
    const email = profile.emails[0].value;
    const userName = email.split("@")[0];
    const isVerified = profile.emails[0].verified;
    const provider = profile.provider;
    const googleID = profile.id;
    const user = await User.findOne({ email });

    if (!user) {
      const newUser = await User.create({
        email,
        userName,
        provider,
        isVerified,
        googleID
      });
      return cb(null, newUser);
    } 
    
    return cb(null, user);
    
  } catch (err) {
    return cb(["Something went wrong: During GOOGLE Callback..!!",err], null);
  }
};
