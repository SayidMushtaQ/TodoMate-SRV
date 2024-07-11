import mongoose from 'mongoose';

const todoShema = new mongoose.Schema(
  {
    content: {
      title:{
        type:String,
        required: true
      },
      description:{
        type:String,
        required: true
      },
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTodo',
      },
    ],
  },
  { timestamps: true }
);

export const Todo = mongoose.model('Todo', todoShema);
