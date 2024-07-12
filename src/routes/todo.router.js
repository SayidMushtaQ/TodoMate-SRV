import {Router} from 'express';
import { createTodo } from '../controllers/Todo/createTodo.controller.js';
import {readTodos} from '../controllers/Todo/readTodos.controller.js';
import { updateTodo } from '../controllers/Todo/updateTodo.controller.js';
import { deleteTodo } from '../controllers/Todo/deleteTodo.controller.js';

const router = Router();

//TODO - CRUD Operation
router.route('/createTodo').post(createTodo);
router.route('/todos').get(readTodos);
router.route('/updateTodo').patch(updateTodo);
router.route('/deleteTodo').delete(deleteTodo);

export default router;