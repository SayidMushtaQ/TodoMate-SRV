import { User } from "../../modules/user.model.js";

export const jwtCallbackHandler = (jwt_payload, cb) => {
    User.findById(jwt_payload._id)
      .then(user => {
        if (user) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      })
      .catch(err => console.error(err));
  }