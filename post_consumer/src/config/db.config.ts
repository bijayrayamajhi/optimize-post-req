import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("connected to the database successfully");
    });
  } catch (error) {
    console.log("Error connecting database: ", error);
  }
};
