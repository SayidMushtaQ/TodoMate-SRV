import { Router } from "express";
import { createSubTodo } from "../controllers/Todo/SubTodo/createSubTodo.controller.js";
import { readSubTodos } from "../controllers/Todo/SubTodo/readSubTodo.controller.js";
import {updateSubTodo} from '../controllers/Todo/SubTodo/updateSubTodo.controller.js';
import {deleteSubTodo} from '../controllers/Todo/SubTodo/deleteSubTodo.controller.js';

const router = Router();

router.route("/createSubTodo").post(createSubTodo);
router.route("/:todoID").get(readSubTodos);
router.route("/updateSubTodo").patch(updateSubTodo);
router.route("/deleteSubTodo").delete(deleteSubTodo);

export default router;
