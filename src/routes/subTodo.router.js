import {Router} from 'express';
import {createSubTodo} from '../controllers/createSubTodo.controller.js';

const router = Router();

router.route('/create').post(createSubTodo)

export default router;