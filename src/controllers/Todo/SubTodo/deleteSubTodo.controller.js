import {SubTodo} from '../../../modules/sub_todo.model.js'
import {ApiError} from '../../../util/apiError.js';
export const deleteSubTodo = (async(req,res)=>{
    const {subTodoID} = req.body;
    const subTodo = await SubTodo.findById({_id:subTodoID}).select('_id');
    if(!subTodo){
        throw new ApiError(404,'The requested Sub Todo item was not found.')
    }
    await SubTodo.findByIdAndDelete({_id:subTodo.id});
    res.status(204).send()
})