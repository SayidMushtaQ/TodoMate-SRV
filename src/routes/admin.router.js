import express from "express";
import { getAllUsers } from "../controllers/Admin/getAllUser.controller.js";
import { AllowTo } from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("/getUsers").get(AllowTo(["ADMIN"]), getAllUsers);

export default router;
