const sessionIDtoUserMap = new Map();

export class AuthSessionUser {
  setUser(id, user) { //Static Methods: Make setUser and getUser static methods since they are working with the shared sessionIDtoUserMap.
    sessionIDtoUserMap.set(id, user);
  }
  getUser(id) {
    return sessionIDtoUserMap.get(id);
  }
}


