import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { EMAIL_REGEX } from "../constants.js";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [EMAIL_REGEX, "Please enter a valid email address"]
    },
    password: {
      type: String,
      min: [6, "At least set 6 character password"]
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "GUEST"],
      default: "USER",
      required: true
    },
    provider: {
      type: String,
      default: "Credential"
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    phone: Number,
    googleID: String,
    isActive: Boolean
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  //methods not method
  return await bcryptjs.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
