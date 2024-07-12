import { Router } from "express";
import { createSubTodo } from "../controllers/createSubTodo.controller.js";
import { readSubTodos } from "../controllers/readSubTodo.controller.js";
import {updateSubTodo} from '../controllers/updateSubTodo.controller.js';

const router = Router();

router.route("/createSubTodo").post(createSubTodo);
router.route("/subTodos").get(readSubTodos);
router.route("/updateTodo").post(updateSubTodo);

export default router;
