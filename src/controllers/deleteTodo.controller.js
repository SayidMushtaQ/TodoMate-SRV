import { asyncHanlder } from "../util/asyncHandler.js";
import {Todo} from '../modules/todo.model.js';
import {ApiError} from '../util/apiError.js';

export const deleteTodo = asyncHanlder(async(req,res)=>{
    const {todoID} = req.body;
    const todo = await Todo.findById({_id:todoID}).select('_id');
    if(!todo){
        throw new ApiError(404,'The requested Todo item was not found.')
    }
    await Todo.findByIdAndDelete({_id:todoID});
    res.status(204).send()
})