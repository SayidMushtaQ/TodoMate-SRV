import express from "express";
import cors from "cors";
import { DATA_LIMIT } from "./constants.js";
import cookie_parser from "cookie-parser";
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

export { app };
