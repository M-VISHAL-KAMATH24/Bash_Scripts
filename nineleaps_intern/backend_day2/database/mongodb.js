import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URL = process.env.DB_URI;

    if (!MONGO_URL) {
      throw new Error("DB_URI is not defined in .env");
    }

    await mongoose.connect(MONGO_URL);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Mongo connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
