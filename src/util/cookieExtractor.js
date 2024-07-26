import { AUTH_TOKEN_NAME } from "../constants.js";
export const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[AUTH_TOKEN_NAME];
  }
  return token;
};
