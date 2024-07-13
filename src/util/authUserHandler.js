const sessionIDtoUserMap = new Map();

export class UserSessionHandle{
    setUser(id,user){
        sessionIDtoUserMap.set(id,user);
    }
    getUser(id){
        return sessionIDtoUserMap.get(id);
    }
}


/**
 * Static Methods:
 *  Make setUser and getUser static methods since they are working 
 *  with the shared sessionIDtoUserMap.
 */
