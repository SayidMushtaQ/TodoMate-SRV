import jwt from "jsonwebtoken";
import { ApiError } from "./apiError.js";
export class UserTokenHandler {
  setUser(user) {
    try{
      return jwt.sign(user, process.env.JWT_SECRET);
    }catch(err){
      console.log(err)
      throw new ApiError(500,"Caused Error while Generationg TOKEN:",[err]);
    }
  }
  getUser(token) {
    try{
      return jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
      throw new ApiError(500,"Caused Error while get TOKEN:",[err]);
    }
  }
}
