import { User } from "../../modules/user.model.js";

export const jwtCallbackHandler = (jwt_payload, cb) => {
  console.log("Run JWT: ",jwt_payload)
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      })
      .catch(err => console.error(err));
  }