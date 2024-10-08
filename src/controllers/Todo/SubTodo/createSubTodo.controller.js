import { Todo } from "../../../modules/todo.model.js";
import { asyncHanlder } from "../../../util/asyncHandler.js";
import { BAD_WORD_REGEX } from "../../../constants.js";
import { SubTodo } from "../../../modules/sub_todo.model.js";
import { ApiResponse } from "../../../util/apiResponse.js";

export const createSubTodo = asyncHanlder(async (req, res) => {
  /**
   * Sub TODO
   */
  /**
   * 1) Get title and validate
   * 2) Check title
   * 3) Check TODO Present or NOT
   * 3) Add in DB
   */
  const { title, todoID } = req.body;

  if ([title, todoID].some(val => val === "")) {
    throw new ApiError(400, "All fields are required", [
      "Please fill up all necessary fields"
    ]);
  }

  if (BAD_WORD_REGEX.test(title)) {
    throw new ApiError(400, "title contains inappropriate or sexual context.", [
      "Please follow the guidelines"
    ]);
  }

  const todo = await Todo.findById({ _id: todoID }).select("id");
  if (!todo) {
    throw new ApiError(404, "User does not exist.");
  }

  const newSubTodo = await SubTodo.create({
    title,
    createdBy: todo.id
  });

  await Todo.findByIdAndUpdate(
    todoID,
    {
      subTodos: [newSubTodo.id]
    },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(200, newSubTodo, "New Sub TODO created Successfully"));
});
