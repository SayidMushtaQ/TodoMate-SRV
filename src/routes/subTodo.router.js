import {Router} from 'express';
import {createSubTodo} from '../controllers/createSubTodo.controller.js';
import {readSubTodos} from '../controllers/readSubTodo.controller.js';

const router = Router();

router.route('/create').post(createSubTodo)
router.route('/read').get(readSubTodos)

export default router;