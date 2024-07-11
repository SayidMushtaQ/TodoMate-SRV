import {Router} from 'express';
import { createTodo } from '../controllers/createTodo.controller.js';
import {readTodos} from '../controllers/readTodos.controller.js';

const router = Router();

//TODO - CRUD Operation
router.route('/createTodo').post(createTodo);
router.route('/todos').get(readTodos);

export default router;