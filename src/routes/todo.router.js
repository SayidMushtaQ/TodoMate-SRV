import {Router} from 'express';
import { createTodo } from '../controllers/createTodo.controller.js';

const router = Router();

//TODO - CRUD Operation
router.route('/create').post(createTodo)

export default router;