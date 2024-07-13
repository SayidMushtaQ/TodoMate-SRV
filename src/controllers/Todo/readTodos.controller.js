import { Todo } from "../../modules/todo.model.js";
import { ApiResponse } from "../../util/apiResponse.js";
import { asyncHanlder } from "../../util/asyncHandler.js";

export const readTodos = asyncHanlder(async (req, res) => {
  const todos = await Todo.find({createdBy:req.user._id});
  res
    .status(200)
    .json(
      new ApiResponse(200, { todos }, "All todo items have been fetched successfully")
    );
});
