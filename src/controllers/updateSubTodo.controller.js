import { asyncHanlder } from "../util/asyncHandler.js";
import { BAD_WORD_REGEX } from "../constants.js";
import { ApiError } from "../util/apiError.js";
import { SubTodo } from "../modules/sub_todo.model.js";
import { ApiResponse } from "../util/apiResponse.js";
export const updateSubTodo = asyncHanlder(async (req, res) => {
  const { content, isComplete, subTodoID } = req.body;
  if (!content) {
    throw new ApiError(400, "Content is required and cannot be left empty");
  }
  if (!subTodoID) {
    throw new ApiError(400, "An error has occurred. Please try again.");
  }
  if (BAD_WORD_REGEX.test(content)) {
    throw new ApiError(400, "Content contains inappropriate or sexual context.", [
      "Please follow the guidelines"
    ]);
  }
  const subTodo = await SubTodo.findById({ _id: subTodoID });
  console.log(subTodo);
  if (!subTodo) {
    throw new ApiError(404, "The requested Sub TODO does not exist.");
  }
  if (subTodo.content === content && subTodo.isComplete === isComplete) {
    return res.status(200).json(
      new ApiResponse(200, subTodo, {
        message: "Sub Todo item updated successfully",
        todoId: subTodo._id
      })
    );
  }
  const updatedSubTodo = await SubTodo.findByIdAndUpdate(
    subTodoID,
    { content, isComplete },
    { new: true }
  );

  res.status(200).json(
    new ApiResponse(200, updatedSubTodo, {
      message: "Sub Todo updated successfully",
      todoId: updatedSubTodo._id
    })
  );
});
