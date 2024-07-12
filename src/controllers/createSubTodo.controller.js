import { Todo } from "../modules/todo.model.js";
import { asyncHanlder } from "../util/asyncHandler.js";
import { BAD_WORD_REGEX } from "../constants.js";
import { SubTodo } from "../modules/sub_todo.model.js";
import { User } from "../modules/user.model.js";
import { ApiResponse } from "../util/apiResponse.js";

export const createSubTodo = asyncHanlder(async (req, res) => {
  /**
   * Sub TODO
   */
  /**
   * 1) Get Content and validate
   * 2) Check Content
   * 3) Check TODO Present or NOT
   * 3) Add in DB
   */
  const { content, userID, todoID } = req.body;
  console.log(content, userID);
  if ([content, userID, todoID].some(val => val === "")) {
    throw new ApiError(400, "All fields are required", [
      "Please fill up all necessary fields"
    ]);
  }

  if (BAD_WORD_REGEX.test(content)) {
    throw new ApiError(400, "Content contains inappropriate or sexual context.", [
      "Please follow the guidelines"
    ]);
  }

  const user = await User.findById({ _id: userID }).select("id");
  if (!user) {
    throw new ApiError(404, "User does not exist.");
  }

  const newSubTodo = await SubTodo.create({
    content,
    createdBy: user.id
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
    .json(new ApiResponse(200, newSubTodo, "New sub TODO created Successfully"));
});
