import {registerUser} from '../controllers/userRegister.controller.js'
import {userLogin} from '../controllers/userLogin.controller.js';
import {Router} from 'express'
import { userLogout } from '../controllers/userLogOut.controller.js';
import {userProfile} from '../controllers/userProfile.controller.js';


const router = Router();

router.route('/user').get(userProfile)
router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
router.route('/userLogout').post(userLogout);





export default router;