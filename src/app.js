import express from "express";
import cors from "cors";
import { DATA_LIMIT, API_VERSION_URL } from "./constants.js";
import cookie_parser from "cookie-parser";
import { requireAuth, AllowTo } from "./middleware/auth.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }) 
);

//Down below: Data configaration
app.use(express.json({ limit: DATA_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: DATA_LIMIT }));
app.use(express.static("public"));
app.use(cookie_parser(process.env.COOKIE_PARSER_SECRET));
app.use(requireAuth);

//Import routes
import userRouter from "./routes/user.router.js";
import todoRouter from "./routes/todo.router.js";
import subTodoRouter from "./routes/subTodo.router.js";

app.use(`${API_VERSION_URL}/users`, userRouter);
app.use(`${API_VERSION_URL}/todo`, AllowTo(["ADMIN", "USER"]), todoRouter);
app.use(`${API_VERSION_URL}/subTodo`, AllowTo(["ADMIN", "USER"]), subTodoRouter);

export { app };
