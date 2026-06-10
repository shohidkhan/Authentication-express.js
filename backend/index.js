import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/db.js";
import dns from "dns";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();
dns.setServers(["0.0.0.0", "8.8.8.8"]);
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouter);

app.listen(port, () => {
  dbConnect();
  console.log(`Example app listening on port ${port}`);
});
