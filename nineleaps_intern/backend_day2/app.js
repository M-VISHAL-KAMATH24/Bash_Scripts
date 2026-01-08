import dotenv from "dotenv";
dotenv.config();   
import express from "express";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import subsriptionRouter from "./routes/subsription.route.js";
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json()); //conerts the incoming request from sjon to the js object 
app.use(express.urlencoded({extended:false}));//parse url encoded data
app.use(cookieParser);//parse the cookies sent by the browsers
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subsriptions',subsriptionRouter);
app.use(errorMiddleware)
const PORT = process.env.PORT ||3000;

app.get("/", (req, res) => {
  res.send("welcome to the subscription tracker API");
});

app.listen(PORT, async () => {
  console.log(`running on port ${PORT}`);
  await connectDB()
});
