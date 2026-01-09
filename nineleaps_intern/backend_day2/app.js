import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import subsriptionRouter from "./routes/subsription.route.js";
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // ✅ FIXED

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subsriptions", subsriptionRouter);

app.get("/", (req, res) => {
  res.send("welcome to the subscription tracker API");
});

app.use(errorMiddleware); // always last

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
  });
};

startServer();
