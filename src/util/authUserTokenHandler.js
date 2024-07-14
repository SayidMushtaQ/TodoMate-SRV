import jwt from "jsonwebtoken";
import { ApiError } from "./apiError.js";
import fs from 'fs';


const privateKey = fs.readFileSync('./src/keys/private.pem','utf-8'); //You can use OpenSsl(https://gnuwin32.sourceforge.net/packages/openssl.htm) Binaries package for generating Key's.
const publicKey = fs.readFileSync('./src/keys/public.pem','utf-8'); //https://www.youtube.com/watch?v=iHb3nFtzFoc

export class UserTokenHandler {
  setUser(user) {
    try{
      return jwt.sign(user, privateKey,{ algorithm: 'RS256'});
    }catch(err){
      console.log(err)
      throw new ApiError(500,"Caused Error while Generationg TOKEN:",[err]);
    }
  }
  getUser(token) {
    try{
      return jwt.verify(token, publicKey,{algorithms:['RS256']});
    }catch(err){
      console.log(err)
      throw new ApiError(500,"Caused Error while get TOKEN:",[err]);
    }
  }
}

/**
 * Token Based - (State Less) Auth
    1) User Token Handler
    2) Generate token and set as a cookie
    3) Middleware
 */
