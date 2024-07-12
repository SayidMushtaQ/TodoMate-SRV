import { SubTodo } from "../../../modules/sub_todo.model.js";
import { ApiResponse } from "../../../util/apiResponse.js";
import { asyncHanlder } from "../../../util/asyncHandler.js";
import { ApiError } from "../../../util/apiError.js";

export const readSubTodos = asyncHanlder(async (req, res) => {
  const { todoID } = req.body;
  if (!todoID) {
    throw new ApiError(400, "Something went wrong..!!");
  }

  const subTodos = await SubTodo.find({ createdBy: todoID });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { subTodos },
        "All SubTodos items have been fetched successfully"
      )
    );
});
