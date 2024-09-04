import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { EMAIL_REGEX } from "../constants.js";
import jwt from "jsonwebtoken";
import { __dirname } from "../util/getCurrentPath.js";

const privateKeyPath = path.join(__dirname, "..", "keys", "private.pem");
const PRIVATE_KEY = fs.readFileSync(privateKeyPath, "utf-8");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    fullname:{
      type: String,
      required: true,
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
    isActive: Boolean,
    refreshToken: String
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      id: this.id,
      userName: this.userName,
      email: this.email,
      role: this.role,
      provider: this.provider
    },
    PRIVATE_KEY,
    { algorithm: "RS256", expiresIn: 2 * 24 * 60 * 60 * 1000 }
  );
};
userSchema.methods.generateRefreshTokne = async function () {
  return jwt.sign(
    {
      id: this.id
    },
    PRIVATE_KEY,
    { algorithm: "RS256", expiresIn: 7 * 24 * 60 * 60 * 1000 }
  );
};

export const User = mongoose.model("User", userSchema);
