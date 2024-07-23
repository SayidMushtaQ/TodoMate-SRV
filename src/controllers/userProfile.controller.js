import { asyncHanlder } from "../util/asyncHandler.js";

export const userProfile = asyncHanlder(async (req, res) => {
  console.log("User Profile:   ",req.session?.passport?.user)
  res.send("User Profile");
});
