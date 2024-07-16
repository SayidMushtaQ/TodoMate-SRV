import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import {AUTH_Redirect_URL} from '../constants.js'
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:AUTH_Redirect_URL
}, (accessToken, refreshToken, profile, cb) => {
    console.log('AccessToken: ',accessToken);
    console.log('RefreshToken: ',refreshToken);
    console.log('Profile: ',profile);
    console.log('CallBack: ',cb);
}));
