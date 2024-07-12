import {registerUser} from '../controllers/userRegister.controller.js'
import {userLogin} from '../controllers/userLogin.controller.js';
import {Router} from 'express'

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);

export default router;