import { ApiError } from "../util/apiError.js";
import { ApiResponse } from "../util/apiResponse.js";
import { asyncHanlder } from "../util/asyncHandler.js";
import {Todo} from '../modules/todo.model.js';
import { BAD_WORD_REGEX } from '../constants.js';
export const updateTodo = asyncHanlder(async(req,res)=>{
    /**
     * Update TODO
     */
    /**
     * 1) Get TODO ID,Data and validate
     * 2) FIND the TODO ACCORDING the ID and Validate
     * 3) Update the todo
     */
    const {title,description,isComplete,todoID} = req.body;
    
    if([title,description].some(val=>val==='')){
        throw new ApiError(400,'The title or description fields are required and cannot be left empty',['Please fill up all necessary fields'])
    }
    if(BAD_WORD_REGEX.test(`${title} ${description}`)){
        throw new ApiError(400,'Content contains inappropriate or sexual context.',['Please follow the guidelines'])
    }
    if(!todoID){
      throw new ApiError(400,'An error has occurred. Please try again.')
    }
    
    const todo = await Todo.findById({_id:todoID}).select('_id');
    if(!todo){
        throw new ApiError(404,'The requested TODO does not exist.')
    }
    const update = {
        content:{
            title,
            description,
        },
        isComplete
    }
    const updatedTodo = await Todo.findByIdAndUpdate({_id:todoID},update,{new:true});

    res.status(200).json(
        new ApiResponse(200,updatedTodo,{message:"Todo item updated successfully.",todoId:updatedTodo._id})
    )
})