import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: Number,
      required: true,
      min: [6, 'At least set 6 character password'],
    },
    phone: {
      type: Number,
      required: true,
    },
    isVerified: Boolean,
    isActive: Boolean,
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
