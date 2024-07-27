import { User } from "../../modules/user.model.js";
import fetch from "node-fetch";
const getGithuEmail = async accessToken => {
  try {
    const res = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json"
      }
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Something went wrong during: Fetching user GITHUB profile Email", err);
  }
};
export const gitCallbackHandler = async (accessToken, refreshToken, profile, cb) => {
  try {
    const userName = profile.username;
    const provider = profile.provider;
    const githutID = profile.id;
    const emails = await getGithuEmail(accessToken);
    const email = emails[0].email;
    const isVerified = emails[0].verified;

    const user = await User.findOne({
      $or: [{ userName }, { email }]
    });
    if (!user) {
      const newUser = await User.create({
        email,
        userName,
        provider,
        isVerified,
        githutID
      });
      return cb(null, newUser);
    }
    return cb(null, user);
  } catch (err) {
    return cb(["Something went wrong: During GITHUB Callback..!!", err], null);
  }
};
