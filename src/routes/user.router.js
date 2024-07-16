import {registerUser} from '../controllers/userRegister.controller.js'
import {userLogin} from '../controllers/userLogin.controller.js';
import {Router} from 'express'
import { authGoogle } from '../controllers/authGoogle.contoller.js';
import { userLogout } from '../controllers/userLogOut.controller.js';


const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
router.route('/google').post(authGoogle);
router.route('/userLogout').post(userLogout);


export default router;