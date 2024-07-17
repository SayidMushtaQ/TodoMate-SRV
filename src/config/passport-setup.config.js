import passport from "passport";
import {Strategy} from "passport-google-oauth20";
import { AUTH_Redirect_URL } from "../constants.js";
import { User } from "../modules/user.model.js";

passport.serializeUser((user,cb)=>{
  console.log("serializeUser: ",user)
  process.nextTick(()=>{
    return cb(null,{
      id:user.id,
      userName:user.userName,
      email:user.email
    })
  })
});

passport.deserializeUser((user,cb)=>{
  console.log('deserializeUser: ',user)
  process.nextTick(()=>{
    User.findById({_id:user.id}).then((user)=>{
      console.log("DB user: ",user);
      return cb(null,user);
    })
  })
})

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/api/v1/users/google/redirect',
      scope:['profile','email']
    },
    async (accessToken, refreshToken, profile, cb) => {
      const email = profile.emails[0].value;
      const userName = email.split("@")[0];
      const isVerified = profile.emails[0].verified;
      const fullName = profile.displayName;
      const provider = profile.provider;
      const googleID = profile.id
      
      const existingUser = await User.findOne({googleID});
      if(!existingUser){
        const newUser = await User.create({
          userName,
          fullName,
          email,
          isVerified,
          provider,
          googleID
        });
        return cb(null,newUser);
      }else{
        console.log("User already exist");
        return cb("User already exist..!!",existingUser);
      }
      
    }
  )
);
