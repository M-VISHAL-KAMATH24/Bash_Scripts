import dotenv from "dotenv";
dotenv.config();   // 👈 must be before using process.env

import express from "express";

const app = express();

const PORT = process.env.PORT ||3000;

app.get("/", (req, res) => {
  res.send("welcome to the subscription tracker API");
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
