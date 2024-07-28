import express from "express";
import cors from "cors";
import { DATA_LIMIT, API_VERSION_URL } from "./constants.js";
import cookie_parser from "cookie-parser";
import { requireAuth } from "./middleware/auth.middleware.js";
import passport from "passport";
import "./config/passport-setup.config.js";
import { rateLimit } from "express-rate-limit";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);
app.use( //Prevent D-DOS Attack 
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "Too many requests from this IP, please try again later."
  })
);

// Passport initisilized
app.use(passport.initialize());

//Down below: Data configaration
app.use(express.json({ limit: DATA_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: DATA_LIMIT }));
app.use(express.static("public"));
app.use(cookie_parser(process.env.COOKIE_PARSER_SECRET));
app.use(requireAuth);

//Import routes
import userRoutes from "./routes/user.router.js";
import todoRoutes from "./routes/todo.router.js";
import subTodoRoutes from "./routes/subTodo.router.js";
import adminRoutes from "./routes/admin.router.js";
app.use(`${API_VERSION_URL}/users`, userRoutes);
app.use(`${API_VERSION_URL}/todo`, todoRoutes);
app.use(`${API_VERSION_URL}/subTodo`, subTodoRoutes);
app.use(`${API_VERSION_URL}/admin`, adminRoutes);

export { app };
