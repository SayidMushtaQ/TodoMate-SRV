import { asyncHanlder } from "../util/asyncHandler.js";



export const userProfile = asyncHanlder(async (req, res) => {
  console.log(req.user)
  res.send(`Welcome Back:`);
});
