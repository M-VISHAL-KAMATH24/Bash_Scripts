import dotenv from "dotenv";
dotenv.config();   
import express from "express";

import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import subsriptionRouter from "./routes/subsription.route";
const app = express();
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subsriptions',subsriptionRouter);

const PORT = process.env.PORT ||3000;

app.get("/", (req, res) => {
  res.send("welcome to the subscription tracker API");
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
