import {registerUser} from '../controllers/userRegister.controller.js'
import {userLogin} from '../controllers/userLogin.controller.js';
import {Router} from 'express'
import { authGoogle } from '../controllers/authGoogle.contoller.js';
import { userLogout } from '../controllers/userLogOut.controller.js';
import {userProfile} from '../controllers/userProfile.controller.js';
import {googleRedirect} from '../controllers/googleRedirect.controller.js';
import passport from 'passport'

const router = Router();

router.route('/user').get(userProfile)
router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
router.route('/userLogout').post(userLogout);
router.route('/googleAuth').get(passport.authenticate('google',{scope:['profile']}),authGoogle);
router.route('/google/redirect').get(googleRedirect);



export default router;