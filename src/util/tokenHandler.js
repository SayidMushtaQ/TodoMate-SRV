import jwt from "jsonwebtoken";
export class TokenHandler {
  generateToken(userID) {
    const token = jwt.sign({ id:userID }, process.env.EMAIL_JWT_SECRET, { expiresIn: "5m" }); 
    return token;
  }
  verifyToken(token) {
    const verify = jwt.verify(token, process.env.EMAIL_JWT_SECRET);
    return verify;
  }
}
