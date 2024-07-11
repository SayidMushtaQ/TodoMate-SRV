import { BAD_WORD_REGEX } from "../constants.js";
import { User } from "../modules/user.model.js";
import { ApiResponse } from "../util/apiResponse.js";
import { asyncHanlder } from "../util/asyncHandler.js";
import {ApiError} from '../util/apiError.js'
import {Todo} from '../modules/todo.model.js';
export const createTodo = asyncHanlder(async(req,res)=>{

    /**
     * Create Todo - Api
     */
    /**
     * 1)Get Data then validate
     *   Data type: 
     *        1) Content
     *        2) Is compelete
     *        3) USER ID
     * 2) Check the content and other values
     * 3) Check user Present or not
     * 4) Create a Todo 
     */
    const {content,isComplete,userID} = req.body;
    const {title,description} = content;
    
    if([title,description,userID].some(val=>val==='')){
        throw new ApiError(400,'All fields are required',['Please fill up all necessary fields'])
    }
    
    if(BAD_WORD_REGEX.test(`${title} ${description}`)){
        throw new ApiError(400,'Content contains inappropriate or sexual context.',['Please follow the guidelines'])
    }
    
    const user = await User.findById({_id:userID}).select('_id');
    if(!user){
        throw new ApiError(404,'User does not exist.')
    }

    const newTodo = await Todo.create({
       content:{
        title,
        description
       },
       isComplete,
       createdBy:user._id
    });
    res.status(200).json(
        new ApiResponse(200,newTodo,"A new Todo has been created successfully.")
    )
})