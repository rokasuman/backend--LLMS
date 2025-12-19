import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("Provide mongoDb URL");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.error("Mongodb connecttion faild", error.message);
  }
};
