import {Router} from 'express';
import { createTodo } from '../controllers/createTodo.controller.js';
import {readTodos} from '../controllers/readTodos.controller.js';
import { updateTodo } from '../controllers/updateTodo.controller.js';
import { deleteTodo } from '../controllers/deleteTodo.controller.js';

const router = Router();

//TODO - CRUD Operation
router.route('/createTodo').post(createTodo);
router.route('/todos').get(readTodos);
router.route('/updateTodo').patch(updateTodo);
router.route('/deleteTodo').delete(deleteTodo);

export default router;