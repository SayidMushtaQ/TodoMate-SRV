import { BAD_WORD_REGEX } from "../../constants.js";
import { User } from "../../modules/user.model.js";
import { ApiResponse } from "../../util/apiResponse.js";
import { asyncHanlder } from "../../util/asyncHandler.js";
import { ApiError } from "../../util/apiError.js";
import { Todo } from "../../modules/todo.model.js";
export const createTodo = asyncHanlder(async (req, res) => {
  const userID = req.user._id;
  const { title } = req.body;

  if ([title].some(val => val === "")) {
    throw new ApiError(400, "All fields are required", [
      "Please fill up all necessary fields"
    ]);
  }

  if (BAD_WORD_REGEX.test(title)) {
    throw new ApiError(400, "Content contains inappropriate or sexual context.", [
      "Please follow the guidelines"
    ]);
  }

  //JUST for safety
  const user = await User.findById({ _id: userID }).select("_id");
  if (!user) {
    throw new ApiError(404, "User does not exist.");
  }

  const newTodo = await Todo.create({
    title,
    createdBy: user._id
  });
  res
    .status(201)
    .json(new ApiResponse(200, newTodo, "A new Todo has been created successfully."));
});
