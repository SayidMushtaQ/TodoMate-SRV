const DB_NAME = "TodoMate";
const DATA_LIMIT = "16kb";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const BAD_WORD_REGEX =
  /\b(?:fuck|shit|bitch|asshole|damn|cunt|dick|pussy|bastard|whore|slut|nigger|faggot|sex|sexual|porn|pornography|nude|nudity|cock|cum|suck|blowjob|handjob|anal|oral|rape|molest|incest)\b/i;
const API_VERSION_URL = "/api/v1";
const excludedPaths = [
  "/api/v1/users/login",
  "/api/v1/users/register",
  "/api/v1/users/googleAuth",
  "/api/v1/users/googleAuth/redirect",
  "/api/v1/users/githubAuth",
  "/api/v1/users/githubAuth/redirect",
  "/api/v1/users/verifyEmail"
];
const GOOGLE_AUTH_REDIRECT_URL = "/api/v1/users/googleAuth/redirect";
const COOKIE_OPTIONS = {
  // httpOnly: true,//TODO:Production
  secure: true, 
  sameSite: 'strict'
};

export {
  DB_NAME,
  DATA_LIMIT,
  EMAIL_REGEX,
  BAD_WORD_REGEX,
  API_VERSION_URL,
  excludedPaths,
  GOOGLE_AUTH_REDIRECT_URL,
  COOKIE_OPTIONS
};
